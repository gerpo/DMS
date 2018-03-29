<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Bouncer;

class RolesController extends Controller
{
    public function store(Request $request)
    {
        return Bouncer::role()->create(
            $request->validate([
                'name' => 'required|max:20|unique:roles',
                'title' => 'required|max:255',
            ])
        );
    }
}
