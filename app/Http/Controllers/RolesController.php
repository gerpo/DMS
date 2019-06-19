<?php

namespace App\Http\Controllers;

use App\Role;
use Silber\Bouncer\Database\Ability;

class RolesController extends Controller
{
    public function index()
    {
        $roles = Role::orderBy('name')->with(['abilities', 'users'])->get();
        $abilities = Ability::all();

        return view('roles')->with(['roles' => $roles, 'abilities' => $abilities]);
    }
}
