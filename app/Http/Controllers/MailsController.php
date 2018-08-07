<?php

namespace App\Http\Controllers;

use App\Mail\RegularMail;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Mail;

class MailsController extends Controller
{
    public function index()
    {
        return view('mails');
    }

    public function store(Request $request)
    {
        $mailData = $request->validate([
            'sender' => ['required', Rule::in($request->user()->roles()->pluck('name'))],
            'toAll' => 'boolean',
            'recipients' => 'array|required_unless:toAll,true',
            'recipients.*' => 'email',
            'ccRecipients.*' => 'email',
            'bccRecipients.*' => 'email',
            'content' => 'string|nullable'
        ]);
dd($mailData);
        if ($request->get('toAll')) {
            $users = User::all();
        } else {
            $users = User::whereIn('email', $request->get('recipients'))->get();
        }

        Mail::to($users)->send(new RegularMail($mailData));
    }
}
