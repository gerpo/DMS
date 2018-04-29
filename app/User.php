<?php

namespace App;

use Gerpo\Plugisto\Models\Plugisto;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Silber\Bouncer\Database\HasRolesAndAbilities;

class User extends Authenticatable
{
    use Notifiable;
    use HasRolesAndAbilities;
    use SoftDeletes;


    protected $guarded = [];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'confirmed' => 'boolean',
        'is_subtenant' => 'boolean'
    ];

    protected static function boot()
    {
        parent::boot();

        self::saving(function ($user) {
            $user->full_room = intval(str_pad($user->floor, 2, 0, STR_PAD_LEFT) . str_pad($user->room, 2, 0,
                    STR_PAD_LEFT));
        });
    }


    public function confirm()
    {
        $this->confirmed = true;
        $this->confirmation_token = null;

        $this->save();
    }

    public function setFirstnameAttribute($value)
    {
        $this->attributes['firstname'] = title_case($value);
    }

    public function setLastnameAttribute($value)
    {
        $this->attributes['lastname'] = title_case($value);
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
