<?php

namespace App\Http\Controllers;

use App\Notification;
use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     */
    public function index()
    {
        $packages = Auth::user()->packages();
        $notifications = Notification::where('published_at','!=' , null)->get();

        return view('home', compact('packages', 'notifications'));
    }
}
