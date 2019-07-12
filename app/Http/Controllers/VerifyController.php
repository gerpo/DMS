<?php

namespace App\Http\Controllers;

use App\Mail\ConfirmEmailMail;
use Auth;
use Mail;

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
