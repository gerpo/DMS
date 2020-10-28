<?php

namespace Tests\Feature;

use Auth;
use Gerpo\Plugisto\Models\Plugisto;
use Gerpo\Plugisto\Scopes\ActiveScope;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    /** @test */
    public function an_admin_can_see_all_active_packages()
    {
        $this->signInAdmin();

        $this->get(route('home'))
            ->assertViewHasAll(['packages' => Plugisto::all()]);
    }

    /** @test */
    public function an_admin_wont_see_inactive_packages()
    {
        $this->signInAdmin();

        Plugisto::find(1)->deactivate();

        $packages = Plugisto::all();

        $this->get(route('home'))
            ->assertViewHasAll(['packages' => $packages]);

        $this->assertNotEquals($packages, Plugisto::withoutGlobalScope(ActiveScope::class)->get());
    }

    /** @test */
    public function an_authorized_user_can_only_see_packages_with_the_right_permissions()
    {
        $this->signIn();

        $user = Auth::user();
        $user->allow('manage_users');

        $packages = $user->packages();

        $this->get(route('home'))
            ->assertViewHas(['packages' => $packages]);

        $this->assertNotEquals($packages,
            Plugisto::withoutGlobalScope(ActiveScope::class)
                ->get());

        $allowedPackages = Plugisto::where('needed_permission', 'manage_users')->orWhereNull('needed_permission')->get();

        $this->assertEquals($allowedPackages, $packages);
    }

    /** @test */
    public function an_authorized_user_can_see_active_packages()
    {
        $this->signIn();

        $user = Auth::user();
        $user->allow('manage_users');

        $packages = Plugisto::where('needed_permission', 'manage_users')->orWhereNull('needed_permission')->get();

        $this->get(route('home'))
            ->assertViewHas(['packages' => $packages]);
    }

    /** @test */
    public function an_authorized_user_wont_see_inactive_packages()
    {
        $this->signIn();

        $user = Auth::user();
        $user->allow('manage_users');

        Plugisto::where('needed_permission', 'manage_users')->first()->deactivate();

        $packages = $user->packages();

        $this->get(route('home'))
            ->assertViewHas(['packages' => $packages]);

        $this->assertNotEquals($packages,
            Plugisto::withoutGlobalScope(ActiveScope::class)
                ->where('needed_permission', 'manage_users')
                ->get());
    }

    /** @test */
    public function guest_cannot_see_the_dashboard()
    {
        $this->withExceptionHandling();

        $this->get(route('home'))
            ->assertRedirect(route('login'));
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed();
    }
}
