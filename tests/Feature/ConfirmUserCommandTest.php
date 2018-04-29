<?php

namespace Tests\Feature;

use App\User;
use Artisan;
use Tests\TestCase;

class ConfirmUserCommandTest extends TestCase
{
    /** @test */
    public function a_user_can_be_confirmed_by_username()
    {
        $user = create(User::class);

        $this->assertFalse($user->confirmed);

        Artisan::call('dms:confirmUser', ['user' => $user->username]);

        $this->assertTrue($user->fresh()->confirmed);
    }

    /** @test */
    public function a_user_can_be_confirmed_by_email()
    {
        $user = create(User::class);

        $this->assertFalse($user->confirmed);

        Artisan::call('dms:confirmUser', ['user' => $user->email]);

        $this->assertTrue($user->fresh()->confirmed);
    }
}
