<?php

namespace App\Http\Middleware;

use Closure;
use Gerpo\Plugisto\Models\Plugisto;
use Gerpo\Plugisto\Scopes\ActiveScope;

class HideInactivePlugistoRoutes
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $baseUri = explode('/', $request->path())[0];
        if (Plugisto::withoutGlobalScope(ActiveScope::class)->where([
            'route' => "/{$baseUri}",
            'is_active' => false
        ])->get()->isNotEmpty()) {
            abort(404);
        }

        return $next($request);
    }
}
