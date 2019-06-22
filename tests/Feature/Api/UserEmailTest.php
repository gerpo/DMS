<?php

namespace Tests\Feature\Api;

use App\User;
use Tests\TestCase;

class UserEmailTest extends TestCase
{
    /** @test */
    public function a_user_can_update_his_email(): void
    {
        $user = create(User::class);
        $this->signIn($user);

        $newEmail = 'newemail@dms.test';

        $payload = [
            'email' => $newEmail,
        ];

        $this->post(route('api.user.email', $user->id), $payload)
            ->assertSuccessful();

        $this->assertEquals($newEmail, $user->fresh()->email);
    }

    /**
     * This endpoint is only to be used for the signed in user.
     * An admin or authorized user can use the api.users.update endpoint.
     */
    /** @test */
    public function an_admin_cannot_update_a_users_email(): void
    {
        $this->withExceptionHandling()->signInAdmin();
        $user = create(User::class);

        $newEmail = 'newemail@dms.test';

        $payload = [
            'email' => $newEmail,
        ];

        $this->post(route('api.user.email', $user->id), $payload)
            ->assertStatus(403);

        $this->assertNotEquals($newEmail, $user->fresh()->email);
    }


}
