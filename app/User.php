<?php

namespace App;

use Gerpo\Plugisto\Models\Plugisto;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Silber\Bouncer\Database\HasRolesAndAbilities;

class User extends Authenticatable
{
    use Notifiable;
    use HasRolesAndAbilities;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'confirmed' => 'boolean',
    ];

    public function confirm()
    {
        $this->confirmed = true;
        $this->confirmation_token = null;

        $this->save();
    }

    public function packages()
    {
        if ($this->isA('admin')) {

            return Plugisto::all();

        }

        return Plugisto::allowed($this->permissionArray())->get();
    }

    public function permissionArray()
    {
        return $this->getAbilities()->pluck('name')->toArray();
    }


}
