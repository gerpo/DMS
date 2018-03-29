<?php

namespace App\Http\Controllers;

use Bouncer;
use Illuminate\Http\Request;

class AbilitiesController extends Controller
{
    public function store(Request $request)
    {
        return Bouncer::ability()->create(
            $request->validate([
                'name' => 'required|max:20|unique:abilities',
                'title' => 'required|max:255',
            ])
        );
    }
}
