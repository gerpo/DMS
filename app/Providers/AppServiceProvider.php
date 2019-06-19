<?php

namespace App\Providers;

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
            return "<?php echo title_case(trans($expression)); ?>";
        });

        Blade::directive('langTitleChoice', function ($expression) {
            return "<?php echo title_case(trans_choice($expression, 10)); ?>";
        });

        Bouncer::useRoleModel(Role::class);
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
