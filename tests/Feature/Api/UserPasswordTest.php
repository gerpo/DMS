<?php

namespace Tests\Feature\Api;

use Hash;
use App\User;
use Tests\TestCase;

class UserPasswordTest extends TestCase
{
    /** @test */
    public function a_user_can_update_his_password(): void
    {
        $user = create(User::class);
        $this->signIn($user);
        $newPassword = 'newPassword';

        $payload = [
            'new-password' => $newPassword,
            'new-password_confirmation' => $newPassword,
        ];

        $this->post(route('api.user.password', $user->id), $payload)
            ->assertSuccessful();

        $this->assertTrue(Hash::check($newPassword, $user->fresh()->password));
    }

    /** @test */
    public function an_admin_cannot_update_a_users_password(): void
    {
        $this->withExceptionHandling()->signInAdmin();
        $user = create(User::class);
        $newPassword = 'newPassword';

        $payload = [
            'new-password' => $newPassword,
            'new-password_confirmation' => $newPassword,
        ];

        $this->post(route('api.user.password', $user->id), $payload)
            ->assertStatus(403);

        $this->assertFalse(Hash::check($newPassword, $user->fresh()->password));
    }
}
