<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;

class UserTest extends TestCase
{
    /** @test */
    public function an_admin_can_see_all_users()
    {
        $this->signInAdmin();

        create(User::class, [], 10);

        $users = User::all();

        $this->get(route('users'))
            ->assertSuccessful()
            ->assertViewHasAll(['users' => $users]);
    }

    /** @test */
    public function an_authorized_user_can_see_all_users()
    {
        $this->signIn([], 'manage_users');

        create(User::class, [], 10);

        $users = User::all();

        $this->get(route('users'))
            ->assertSuccessful()
            ->assertViewHasAll(['users' => $users]);  
    }

    /** @test */
    public function an_unauthorized_user_cannot_see_all_users()
    {
        $this->withExceptionHandling()->signIn();

        $this->get(route('users'))
            ->assertStatus(403);
    }
}
