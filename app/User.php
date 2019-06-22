<?php

namespace App;

use Bouncer;
use Gerpo\Plugisto\Models\Plugisto;
use Gerpo\DmsCredits\Traits\UsesCodes;
use Illuminate\Notifications\Notifiable;
use Gerpo\DmsCredits\Traits\HasCreditAccount;
use Illuminate\Database\Eloquent\SoftDeletes;
use Silber\Bouncer\Database\HasRolesAndAbilities;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
    use HasRolesAndAbilities;
    use SoftDeletes;
    use HasCreditAccount;
    use UsesCodes;

    protected $guarded = [];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'confirmed' => 'boolean',
        'is_subtenant' => 'boolean',
    ];

    protected $appends = [
        'full_name',
    ];

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
