<?php

namespace App\Http\Controllers;

use Auth;
use Mail;
use App\Mail\ConfirmEmailMail;

class VerifyController extends Controller
{
    public function index()
    {
        return view('verify');
    }

    public function create()
    {
        $user = Auth::user();
        Mail::to($user)->send(new ConfirmEmailMail($user));

        return redirect('/');
    }
}
