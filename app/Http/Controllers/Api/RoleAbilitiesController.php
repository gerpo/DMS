<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Silber\Bouncer\Database\Role;

class RoleAbilitiesController extends Controller
{
    public function store(Role $role)
    {
        request()->validate([
            'data' => 'array|required',
            'data.*' => 'array|required',
            'data.*.name' => 'required|exists:abilities',
        ]);

        $data = collect(request()->get('data'));

        $data->each(function ($ability, $key) use ($role) {
            $role->allow($ability['name']);
        });
    }

    public function destroy(Role $role)
    {
        request()->validate([
            'data' => 'array|required',
            'data.*' => 'array|required',
            'data.*.name' => 'required|exists:abilities',
        ]);

        $data = collect(request()->get('data'));

        $data->each(function ($ability, $key) use ($role) {
            $role->disallow($ability['name']);
        });
    }
}
