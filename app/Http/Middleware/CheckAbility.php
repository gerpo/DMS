<?php

namespace App\Http\Middleware;

use Closure;

class CheckAbility
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param $abilities
     * @return mixed
     */
    public function handle($request, Closure $next, ...$abilities)
    {
        $user = request()->user();

        if ($user->isAn('admin')) {
            return $next($request);
        }

        foreach ($abilities as $ability) {
            if ($user->can($ability)) {
                return $next($request);
            }
        }

        abort(403);
    }
}
