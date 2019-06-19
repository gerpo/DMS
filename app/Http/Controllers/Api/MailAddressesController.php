<?php

namespace App\Http\Controllers\Api;

use App\Role;
use App\User;
use App\Http\Controllers\Controller;

class MailAddressesController extends Controller
{
    public function index()
    {
        return $this->allowedEmails(auth()->user());
    }

    private function allowedEmails($user)
    {
        if ($user->isAn('admin') || $user->can('send_mails')) {
            return $this->getRoleMails()->merge($this->getFloorMails());
        }

        $addresses = collect();

        if ($user->can('send_roleMails')) {
            $addresses->push($this->getRoleMails());
        }

        if ($user->can('send_floorMails')) {
            $addresses->push($this->getFloorMails($user->floor));
        }

        return $addresses;
    }

    private function getRoleMails()
    {
        return collect([
            'roles' => Role::with('users')->get()
                ->pluck('users', 'name')
                ->map(function ($users) {
                    return $users->pluck('email');
                })->sortKeys(),
        ]);
    }

    private function getFloorMails($floor = null)
    {
        if ($floor !== null) {
            $addresses = User::where('floor', $floor)->get(['email', 'floor']);
        } else {
            $addresses = User::get(['email', 'floor']);
        }

        return collect([
            'floors' => $addresses
                ->mapToGroups(function ($user) {
                    return [$user->floor => $user['email']];
                })->sortKeys(),
        ]);
    }

    public function query()
    {
        $this->validate(request(), [
            'query' => 'required',
        ]);

        $query = request('query');

        return User::where('email', 'LIKE', "%$query%")
            ->pluck('email');
    }
}
