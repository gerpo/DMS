<?php

namespace App\Providers;

use App\Role;
use Blade;
use Bouncer;
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
        Blade::directive('langTitle',function($expression) {
            return "<?php echo title_case(trans($expression)); ?>";
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
