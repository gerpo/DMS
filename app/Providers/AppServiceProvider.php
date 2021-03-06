<?php

namespace App\Providers;

use App\Observers\UserObserver;
use App\User;
use Blade;
use Bouncer;
use App\Role;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Blade::directive('langTitle', function ($expression) {
            return "<?php echo \Illuminate\Support\Str::title(trans($expression)); ?>";
        });

        Blade::directive('langTitleChoice', function ($expression) {
            return "<?php echo \Illuminate\Support\Str::title(trans_choice($expression, 10)); ?>";
        });

        Bouncer::useRoleModel(Role::class);

        User::observe(UserObserver::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
