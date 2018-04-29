<?php

namespace Tests\Feature\Api;

use App\User;
use Tests\TestCase;

class UserTest extends TestCase
{
    /** @test */
    public function an_admin_can_see_all_users()
    {
        $this->signInAdmin();

        create(User::class, [], 10);

        $users = User::orderBy('lastname')->get()->toJson();

        $this->get(route('api.users',
            ['residentFilter' => json_encode(['current_tenant', 'main_tenant', 'subtenant'])]))
            ->assertSuccessful()
            ->assertSee($users);
    }

    /** @test */
    public function an_authorized_user_can_see_all_users()
    {
        $this->signIn([], 'manage_users');

        create(User::class, [], 10);

        $users = User::orderBy('lastname')->get()->toJson();

        $this->get(route('api.users',
            ['residentFilter' => json_encode(['current_tenant', 'main_tenant', 'subtenant'])]))
            ->assertSuccessful()
            ->assertSee($users);
    }

    /** @test */
    public function an_unauthorized_user_cannot_see_all_users()
    {
        $this->withExceptionHandling()->signIn();

        $this->get(route('api.users',
            ['residentFilter' => json_encode(['current_tenant', 'main_tenant', 'subtenant'])]))
            ->assertStatus(403);
    }

    /** @test */
    public function users_can_be_filtered_by_dorm_name()
    {
        $admin = create(User::class, ['house' => 'Dorm A']);

        $this->signInAdmin($admin);

        create(User::class, ['house' => 'Dorm A'], 2);
        create(User::class, ['house' => 'Dorm B'], 2);

        $users = User::where('house', '<>', 'Dorm B')->orderBy('lastname')->get()->toArray();

        $this->get(route('api.users', [
            'houses' => json_encode(['Dorm B']),
            'residentFilter' => json_encode([
                'current_tenant',
                'main_tenant',
                'subtenant'
            ])
        ]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 3]);
    }

    /** @test */
    public function users_can_be_sorted_by_column_name()
    {
        $this->signInAdmin();

        create(User::class, [], 2);

        $users = User::orderBy('firstname')->get()->toArray();

        $this->get(route('api.users', [
            'sort' => json_encode(['fieldName' => 'firstname', 'order' => 'asc']),
            'residentFilter' => json_encode([
                'current_tenant',
                'main_tenant',
                'subtenant'
            ])
        ]))
            ->assertSuccessful()
            ->assertJson(['data' => $users]);
    }

    /** @test */
    public function sort_order_can_be_changed()
    {
        $this->signInAdmin();

        create(User::class, [], 2);

        $users = User::orderBy('lastname', 'desc')->get()->toArray();

        $this->get(route('api.users', [
            'sort' => json_encode(['fieldName' => 'lastname', 'order' => 'desc']),
            'residentFilter' => json_encode([
                'current_tenant',
                'main_tenant',
                'subtenant'
            ])
        ]))
            ->assertSuccessful()
            ->assertJson(['data' => $users]);
    }

    /** @test */
    public function users_can_be_filtered_by_lastname()
    {
        $this->signInAdmin();

        create(User::class, ['lastname' => 'user1']);
        create(User::class, [], 2);

        $users = User::where('lastname', 'LIKE', 'user1%')->orderBy('lastname')->get()->toArray();

        $this->get(route('api.users', [
            'filter' => 'user1',
            'residentFilter' => json_encode([
                'current_tenant',
                'main_tenant',
                'subtenant'
            ])
        ]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 1]);
    }

    /** @test */
    public function users_can_be_filtered_by_firstname()
    {
        $this->signInAdmin();

        create(User::class, ['firstname' => 'user1']);
        create(User::class, [], 2);

        $users = User::where('firstname', 'LIKE', 'user1%')->orderBy('firstname')->get()->toArray();

        $this->get(route('api.users', [
            'filter' => 'user1',
            'residentFilter' => json_encode([
                'current_tenant',
                'main_tenant',
                'subtenant'
            ])
        ]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 1]);
    }

    /** @test */
    public function users_can_be_filtered_by_username()
    {
        $this->signInAdmin();

        create(User::class, ['username' => 'user1']);
        create(User::class, [], 2);

        $users = User::where('username', 'LIKE', 'user1%')->orderBy('username')->get()->toArray();

        $this->get(route('api.users', [
            'filter' => 'user1',
            'residentFilter' => json_encode([
                'current_tenant',
                'main_tenant',
                'subtenant'
            ])
        ]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 1]);
    }

    /** @test */
    public function users_can_be_filtered_by_email()
    {
        $this->signInAdmin();

        create(User::class, ['email' => 'user1']);
        create(User::class, [], 2);

        $users = User::where('email', 'LIKE', 'user1%')->orderBy('email')->get()->toArray();

        $this->get(route('api.users', [
            'filter' => 'user1',
            'residentFilter' => json_encode([
                'current_tenant',
                'main_tenant',
                'subtenant'
            ])
        ]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 1]);
    }

    /** @test */
    public function only_current_users_can_be_shown()
    {
        $this->signInAdmin();

        $deletedUser = create(User::class);
        $deletedUser->delete();

        create(User::class, [], 2);

        $users = User::orderBy('lastname')->get()->toArray();

        $this->get(route('api.users',
            ['residentFilter' => json_encode(['current_tenant', 'main_tenant'])]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 3]);
    }

    /** @test */
    public function only_former_users_can_be_shown()
    {
        $this->signInAdmin();

        create(User::class)->delete();
        create(User::class, [], 2);

        $users = User::onlyTrashed()->orderBy('lastname')->get()->toArray();

        $this->get(route('api.users',
            ['residentFilter' => json_encode(['former_tenant', 'main_tenant'])]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 1]);
    }

    /** @test */
    public function former_and_current_users_can_be_shown()
    {
        $this->signInAdmin();

        $deletedUser = create(User::class);
        $deletedUser->delete();

        create(User::class, [], 2);

        $users = User::withTrashed()->orderBy('lastname')->get()->toArray();

        $this->get(route('api.users',
            ['residentFilter' => json_encode(['former_tenant', 'current_tenant', 'main_tenant'])]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 4]);
    }

    /** @test */
    public function only_current_main_tenants_can_be_shown()
    {
        $this->signInAdmin();

        $deletedUser = create(User::class);
        $deletedUser->delete();

        create(User::class, [], 2);
        create(User::class, ['is_subtenant' => true], 2);

        $users = User::where('is_subtenant', false)->orderBy('lastname')->get()->toArray();

        $this->get(route('api.users',
            ['residentFilter' => json_encode(['current_tenant', 'main_tenant'])]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 3]);
    }

    /** @test */
    public function only_current_sub_tenants_can_be_shown()
    {
        $this->signInAdmin();

        $deletedUser = create(User::class);
        $deletedUser->delete();

        create(User::class, [], 2);
        create(User::class, ['is_subtenant' => true], 2);

        $users = User::where('is_subtenant', true)->orderBy('lastname')->get()->toArray();

        $this->get(route('api.users',
            ['residentFilter' => json_encode(['current_tenant', 'subtenant'])]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 2]);
    }

    /** @test */
    public function no_users_shown_when_neither_active_nor_former_tenants_selected()
    {
        $this->signInAdmin();

        create(User::class, [], 2);

        $this->get(route('api.users',
            ['residentFilter' => json_encode(['main_tenant', 'subtenant'])]))
            ->assertSuccessful()
            ->assertJson([
                'data' => [],
                'total' => 0
            ]);
    }

    /** @test */
    public function no_users_shown_when_neither_main_nor_sub_tenants_selected()
    {
        $this->signInAdmin();

        create(User::class, [], 2);

        $this->get(route('api.users',
            ['residentFilter' => json_encode(['current_tenant', 'former_tenant'])]))
            ->assertSuccessful()
            ->assertJson([
                'data' => [],
                'total' => 0
            ]);
    }

    /** @test */
    public function user_data_is_paginated()
    {
        $this->signInAdmin();

        create(User::class, [], 60);

        $users = User::orderBy('lastname')->paginate(50)->toArray();

        $this->get(route('api.users',
            ['residentFilter' => json_encode(['current_tenant', 'main_tenant'])]))
            ->assertSuccessful()
            ->assertJson([
                'data' => $users['data'],
                'total' => $users['total']
            ]);
    }
}
