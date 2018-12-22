<?php

namespace App;

use Bouncer;
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

    protected $appends = [
        'full_name'
    ];

    protected static function boot()
    {
        parent::boot();

        self::saving(function ($user) {
            $user->full_room = (int)str_pad($user->floor, 2, 0, STR_PAD_LEFT) . str_pad($user->room, 2, 0,
                    STR_PAD_LEFT);
        });

        self::created(function ($user) {
            Bouncer::assign('member')->to($user);
        });
    }


    public function confirm(): void
    {
        $this->confirmed = true;
        $this->confirmation_token = null;

        $this->save();
    }

    public function setFirstnameAttribute($value): void
    {
        $this->attributes['firstname'] = title_case($value);
    }

    public function setLastnameAttribute($value): void
    {
        $this->attributes['lastname'] = title_case($value);
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->firstname} {$this->lastname}";
    }

    public function packages()
    {
        if ($this->isA('admin')) {

            return Plugisto::all();

        }

        return Plugisto::allowed($this->permissionArray())->get();
    }

    public function permissionArray(): array
    {
        return $this->getAbilities()->pluck('name')->toArray();
    }
}
