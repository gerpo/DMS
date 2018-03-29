<?php

use App\User;

function create($class, $attributes = [], $times = null)
{
    $users = factory($class, $times)->create($attributes);

    if ($class == User::class) {
        $users->each(function ($user) {
            $user->assign('member');
        });
    }

    return $users;
}

function make($class, $attributes = [], $times = null)
{
    return factory($class, $times)->make($attributes);
}
