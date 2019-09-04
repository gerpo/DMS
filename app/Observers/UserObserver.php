<?php

namespace App\Observers;

use App\Events\UserEmailChanged;
use App\User;
use Bouncer;
use Illuminate\Support\Str;

class UserObserver
{
    public function created(User $user): void
    {
        Bouncer::assign('member')->to($user);

        if ($user->house === config('dms.owner_dorm')) {
            Bouncer::assign('resident')->to($user);
        }
    }

    public function saving(User $user): void
    {
        $user->full_room = str_pad($user->floor, 2, 0, STR_PAD_LEFT) . str_pad($user->room, 2, 0,
                STR_PAD_LEFT);
    }

    public function updating(User $user): void
    {
        if ($user->getOriginal('email') !== $user->email) {
            $user->confirmed = false;
            $user->confirmation_token = Str::limit(md5($user->email . Str::random()), 25, '');
            event(new UserEmailChanged($user));
        }

        if ($user->house === config('dms.owner_dorm') && $user->getOriginal('house') !== config('dms.owner_dorm')) {
            Bouncer::assign('resident')->to($user);
        } elseif ($user->house !== config('dms.owner_dorm') && $user->isA('resident')) {
            Bouncer::retract('resident')->from($user);
        }
    }

}
