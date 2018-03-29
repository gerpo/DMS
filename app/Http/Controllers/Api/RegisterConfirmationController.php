<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;

class RegisterConfirmationController extends Controller
{
    public function index()
    {
        $user = User::where('confirmation_token', request('token'))->first();

        if (! $user) {
            return redirect(route('home'))->with('flash', 'Unknown token.');
        }

        $user->confirm();

        return redirect(route('home'))
            ->with('flash', 'Your account is now confirmed! You may post to the forum.');
    }
}
