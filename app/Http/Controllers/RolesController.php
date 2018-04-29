<?php

namespace App\Http\Controllers;

use Silber\Bouncer\Database\Ability;
use Silber\Bouncer\Database\Role;

class RolesController extends Controller
{
    public function index()
    {
        $roles = Role::orderBy('name')->with(['abilities', 'users'])->get();
        $abilities = Ability::all();
        
        return view('roles')->with(['roles' => $roles, 'abilities' => $abilities]);
    }
}
