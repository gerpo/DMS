<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

class RedirectIfUnconfirmed
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (! Auth::user()->confirmed) {
            return redirect('/verify');
        }

        return $next($request);
    }
}
