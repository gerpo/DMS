<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Hash;

class UserPasswordController extends Controller
{
    public function update(User $user): void
    {
        $data= request()->validate([
            'new-password' => 'required|string|min:6|confirmed'
        ]);

        $user->password = Hash::make($data['new-password']);
        $user->save();
    }
}
