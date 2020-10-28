<?php

namespace App\Http\Controllers;

use App\Role;
use PDF;

class RolePosterController extends Controller
{
    public function index()
    {//$public_roles = Role::whereIn('name', config('dms.public_roles'))->get();

        $public_roles = Role::all();

        return view('pdfs.roleposter', ['roles' => $public_roles]);
        $poster = PDF::loadView('pdfs.roleposter', ['roles' => $public_roles]);

        return $poster->download('role_poster.pdf');
    }
}
