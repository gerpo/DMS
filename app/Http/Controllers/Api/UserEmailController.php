<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;

class UserEmailController extends Controller
{
    public function update(User $user)
    {
        $data = request()->validate([
            'new-email' => 'required|string|email|max:255|unique:users,email',
        ]);

        $user->email = $data['new-email'];
        $user->save();
    }
}
