<?php

namespace Tests\Feature;

use Tests\TestCase;

class UserTest extends TestCase
{
    /** @test */
    public function an_admin_can_see_users_page()
    {
        $this->signInAdmin();

        $this->get(route('users'))
            ->assertSuccessful()
            ->assertViewIs('users');
    }

    /** @test */
    public function an_authorized_user_can_see_users_page()
    {
        $this->signIn([], 'manage_users');

        $this->get(route('users'))
            ->assertSuccessful()
            ->assertViewIs('users');
    }

    /** @test */
    public function an_unauthorized_user_cannot_see_users_page()
    {
        $this->withExceptionHandling()->signIn();

        $this->get(route('users'))
            ->assertStatus(403);
    }
}
