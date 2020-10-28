<?php

namespace Tests\Feature;

use App\User;
use Artisan;
use Bouncer;
use Tests\TestCase;

class AdminCommandTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        Bouncer::dontCache();
    }

    /** @test */
    public function a_user_can_be_assigned_admin_role_by_username()
    {
        $user = create(User::class);

        $this->assertFalse($user->isAn('admin'));

        Artisan::call('dms:makeAdmin', ['user' => $user->username]);

        $this->assertTrue($user->isAn('admin'));
    }

    /** @test */
    public function a_user_can_be_assigned_admin_role_by_email()
    {
        $user = create(User::class);

        $this->assertFalse($user->isAn('admin'));

        Artisan::call('dms:makeAdmin', ['user' => $user->email]);

        $this->assertTrue($user->isAn('admin'));
    }
}
