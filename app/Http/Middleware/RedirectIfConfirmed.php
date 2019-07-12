<?php


namespace App\Http\Middleware;


use Auth;
use Closure;

class RedirectIfConfirmed
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
        if (Auth::user()->confirmed) {
            return redirect('/home');
        }

        return $next($request);
    }
}
