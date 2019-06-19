<?php

namespace App\Http\Controllers;

use Gerpo\Plugisto\Models\Plugisto;
use Gerpo\Plugisto\Scopes\ActiveScope;

class PluginsController extends Controller
{
    public function index()
    {
        $plugins = Plugisto::withoutGlobalScope(ActiveScope::class)->get();

        return view('plugins')->with(['plugins' => $plugins]);
    }
}
