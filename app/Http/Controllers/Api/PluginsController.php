<?php

namespace App\Http\Controllers\Api;

use Gerpo\Plugisto\Models\Plugisto;
use App\Http\Controllers\Controller;
use Gerpo\Plugisto\Scopes\ActiveScope;

class PluginsController extends Controller
{
    public function update($id)
    {
        Plugisto::withoutGlobalScope(ActiveScope::class)->findOrFail($id)
            ->update(request()->validate([
                'is_active' => 'required|boolean',
            ]));
    }

    public function destroy($id)
    {
        $plugin = Plugisto::withoutGlobalScope(ActiveScope::class)->findOrFail($id);
        $plugin->delete();
    }
}
