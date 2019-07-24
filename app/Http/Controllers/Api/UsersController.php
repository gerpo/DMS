<?php

namespace App\Http\Controllers\Api;

use App\Scopes\ActiveScope;
use App\User;
use App\Http\Controllers\Controller;

class UsersController extends Controller
{
    public function index()
    {
        $filter = request()->filter.'%';
        $orderColumn = json_decode(request()->sort)->fieldName ?? 'lastname';
        $order = json_decode(request()->sort)->order ?? 'asc';
        $dorms = json_decode(request()->houses) ?? [];
        $residentFilter = array_map('strtolower',
            json_decode(request()->residentFilter) ?? [User::ACTIVE, User::MAIN_TENANT, User::SUB_TENANT]);

        $query = $this->buildResidentFilterQuery($residentFilter);

        $users = $query->whereNotIn('house', $dorms)
            ->where(function ($subQuery) use ($filter, $orderColumn, $order) {
                $subQuery->where('email', 'LIKE', $filter)
                    ->orWhere('firstname', 'LIKE', $filter)
                    ->orWhere('lastname', 'LIKE', $filter)
                    ->orWhere('username', 'LIKE', $filter);
            })
            ->orderBy($orderColumn, $order)
            ->get();

        return json_encode(['data' => $users, 'total' => $users->count()]);
    }

    private function buildResidentFilterQuery($residentFilter)
    {
        $query = new User();

        switch (true) {
            case in_array(User::INACTIVE, $residentFilter) && ! in_array(User::ACTIVE, $residentFilter):
                $query = $query->onlyInactive();
                break;
            case in_array(User::INACTIVE, $residentFilter) && in_array(User::ACTIVE, $residentFilter):
                $query = $query->withInactive();
                break;
            case ! in_array(User::INACTIVE, $residentFilter) && ! in_array(User::ACTIVE, $residentFilter):
                $query = $query->where('house', 'INVALID');
                break;
        }

        switch (true) {
            case in_array(User::MAIN_TENANT, $residentFilter) && ! in_array(User::SUB_TENANT, $residentFilter):
                $query = $query->where('is_subtenant', false);
                break;
            case in_array(User::SUB_TENANT, $residentFilter) && ! in_array(User::MAIN_TENANT, $residentFilter):
                $query = $query->where('is_subtenant', true);
                break;
            case ! in_array(User::SUB_TENANT, $residentFilter) && ! in_array(User::MAIN_TENANT, $residentFilter):
                $query = $query->where('house', 'INVALID');
                break;
        }

        return $query;
    }

    public function update(User $user)
    {
        $dorms = implode(',', config('dms.dorms'));

        $user->update(request()->validate([
            'firstname' => 'required|string|max:100',
            'lastname' => 'required|string|max:100',
            'username' => 'required|max:255|unique:users,username,'.$user->id,
            'email' => 'required|email|max:255|unique:users,email,'.$user->id,
            'floor' => 'required|integer|max:255',
            'room' => 'required|integer|max:255',
            'house' => 'required|string|max:255|in:'.$dorms,
        ]));

        return $user->fresh();
    }
}
