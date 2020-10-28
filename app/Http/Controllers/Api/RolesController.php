<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Role;
use Bouncer;
use Illuminate\Http\Request;

class RolesController extends Controller
{
    public function store(Request $request)
    {
        $role = Bouncer::role()->create(
            $request->validate([
                'name' => 'required|max:20|unique:roles',
                'title' => 'required|max:255',
            ])
        );

        return $role;
    }

    public function destroy(Role $role)
    {
        $role->delete();
    }
}
