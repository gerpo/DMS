<?php

namespace App\Http\Controllers;

use App\User;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::all();

        return view('users', compact('users'));
    }

    public function show(User $user)
    {
        $user->load(['roles', 'abilities']);
        return view('profile')->with(['user' => $user]);
    }
}
