<?php

namespace App\Http\Controllers\Api;

use Bouncer;
use App\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
