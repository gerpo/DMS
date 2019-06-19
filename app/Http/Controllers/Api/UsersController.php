<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;

class UsersController extends Controller
{
    public function index()
    {
        $filter = request()->filter . '%';
        $orderColumn = json_decode(request()->sort)->fieldName ?? 'lastname';
        $order = json_decode(request()->sort)->order ?? 'asc';
        $dorms = json_decode(request()->houses) ?? [];
        $residentFilter = array_map('strtolower',
            json_decode(request()->residentFilter) ?? ['current_tenant', 'main_tenant', 'subtenant']);

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
            case in_array('former_tenant', $residentFilter) && !in_array('current_tenant', $residentFilter):
                $query = $query->onlyTrashed();
                break;
            case in_array('former_tenant', $residentFilter) && in_array('current_tenant', $residentFilter):
                $query = $query->withTrashed();
                break;
            case !in_array('former_tenant', $residentFilter) && !in_array('current_tenant', $residentFilter):
                $query = $query->where('house', 'INVALID');
                break;
        }

        switch (true) {
            case in_array('main_tenant', $residentFilter) && !in_array('subtenant', $residentFilter):
                $query = $query->where('is_subtenant', false);
                break;
            case in_array('subtenant', $residentFilter) && !in_array('main_tenant', $residentFilter):
                $query = $query->where('is_subtenant', true);
                break;
            case !in_array('subtenant', $residentFilter) && !in_array('main_tenant', $residentFilter):
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
            'username' => 'required|max:255|alpha_dash|unique:users,username,' . $user->id,
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'floor' => 'required|integer|max:255',
            'room' => 'required|integer|max:255',
            'house' => 'required|string|max:255|in:' . $dorms,
        ]));

        return $user;
    }
}
