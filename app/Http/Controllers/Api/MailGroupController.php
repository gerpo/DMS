<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Role;
use App\User;
use Illuminate\Support\Collection;

class MailGroupController extends Controller
{
    public function index()
    {
        return $this->allowedGroups(auth()->user());
    }

    private function allowedGroups($user): Collection
    {
        if ($user->isAn('admin') || $user->can('send_mails')) {
            return $this->roleGroups()->merge($this->floorGroups());
        }

        $groups = collect();

        if ($user->can('send_roleMails')) {
            $groups->push($this->roleGroups());
        }

        if ($user->can('send_floorMails')) {
            $groups->push($this->floorGroups($user->floor));
        }

        return $groups;
    }

    private function roleGroups(): Collection
    {
        return Role::all('name')
            ->mapWithKeys(function ($role) {
                return ['role_' . $role->name => $role->name];
            })->toBase();
    }

    private function floorGroups(): Collection
    {
        return User::select('floor')
            ->distinct()->orderBy('floor')->get()
            ->mapWithKeys(function ($user) {
                return ['floor_' . $user->floor => 'Floor '.$user->floor];
            });
    }
}
