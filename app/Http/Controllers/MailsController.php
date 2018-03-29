<?php

namespace App\Http\Controllers;

use App\Mail\RegularMail;
use App\User;
use Illuminate\Http\Request;
use Mail;

class MailsController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'toAll' => 'boolean',
            'to' => 'array|required_unless:toAll,true',
            'to.*' => 'email'
        ]);

        if ($request->get('toAll')) {
            $users = User::all();
        } else {
            $users = User::whereIn('email', $request->get('to'))->get();
        }

        Mail::to($users)->send(new RegularMail());
    }
}
