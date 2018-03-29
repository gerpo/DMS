<?php

namespace App\Http\Controllers;

use App\User;

class UserRolesController extends Controller
{
    public function store(User $user)
    {
        request()->validate([
            'data' => 'array|required',
            'data.*' => 'array|required',
            'data.*.name' => 'required|exists:roles',
        ]);

        $data = collect(request()->get('data'));

        $data->each(function ($role, $key) use ($user) {
            $user->assign($role['name']);
        });
    }

    public function destroy(User $user)
    {
        request()->validate([
            'data' => 'array|required',
            'data.*' => 'array|required',
            'data.*.name' => 'required|exists:roles',
        ]);

        $data = collect(request()->get('data'));

        $data->each(function ($role, $key) use ($user) {
            $user->retract($role['name']);
        });
    }
}
