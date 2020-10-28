<?php

namespace App;

use App\Scopes\ActiveScope;
use Gerpo\Plugisto\Models\Plugisto;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Silber\Bouncer\Database\HasRolesAndAbilities;

class User extends Authenticatable
{
    use Notifiable;
    use HasRolesAndAbilities;

    public const MAIN_TENANT = 'main_tenant';
    public const SUB_TENANT = 'sub_tenant';
    public const ACTIVE = 'active_tenant';
    public const INACTIVE = 'inactive_tenant';

    protected $guarded = [];
    protected $dates = [
        'created_at',
        'updated_at',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $casts = [
        'confirmed' => 'boolean',
        'is_subtenant' => 'boolean',
        'is_active' => 'boolean',
    ];
    protected $appends = [
        'full_name',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::addGlobalScope(new ActiveScope());
    }

    public function confirm(): void
    {
        $this->confirmed = true;
        $this->confirmation_token = null;

        $this->save();
    }

    public function activate(): void
    {
        $this->is_active = true;

        $this->save();
    }

    public function deactivate(): void
    {
        $this->is_active = false;

        $this->save();
    }

    public function setFirstnameAttribute($value): void
    {
        $this->attributes['firstname'] = Str::title($value);
    }

    public function setLastnameAttribute($value): void
    {
        $this->attributes['lastname'] = Str::title($value);
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

    public function getPermissionsAttribute()
    {
        return $this->abilities->merge($this->roles->flatMap(function ($role) {
            return $role->abilities;
        }))->unique();
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'user_id');
    }

    public function scopeWithInactive($query)
    {
        return $query->withoutGlobalScope(ActiveScope::class);
    }

    public function scopeOnlyInactive($query)
    {
        return $this->scopeWithInactive($query)->where('is_active', false);
    }
}
