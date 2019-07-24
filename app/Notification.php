<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Parsedown;

class Notification extends Model
{
    protected $guarded = [];

    protected $dates = [
        'created_at',
        'updated_at',
        'published_at',
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public static function boot()
    {
        parent::boot();

        static::saving(function ($notification) {
            if (!$notification->is_active || $notification->published_at !== null) {
                return;
            }

            $notification->published_at = Carbon::now();
        });
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function publish($publish = true)
    {
        $this->is_active = $publish;

        $this->save();
    }
}
