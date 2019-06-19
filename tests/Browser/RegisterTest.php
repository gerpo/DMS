<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class RegisterTest extends DuskTestCase
{
    use DatabaseMigrations;

    /** @test
     * @throws
     */
    public function a_user_can_register_an_account()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit(route('register'))
                ->type('firstname', 'John')
                ->type('lastname', 'Doe')
                ->type('floor', 12)
                ->type('room', 9)
                ->select('house', 'Dorm A')
                ->type('username', 'testUser')
                ->type('email', 'john@doe.com')
                ->type('password', 'secret')
                ->type('password_confirmation', 'secret')
                ->press('Register')
                ->screenshot('bla')
                ->assertRouteIs('home');
        });
    }
}
