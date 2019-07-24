<?php

namespace Tests\Feature\Api;

use App\Scopes\ActiveScope;
use App\User;
use Hash;
use Tests\TestCase;

class UserTest extends TestCase
{
    /** @test */
    public function an_admin_can_see_all_users(): void
    {
        $this->signInAdmin();

        create(User::class, [], 10);

        $users = User::orderBy('lastname')->get()->toJson();

        $this->get(route('api.users',
            ['residentFilter' => json_encode([User::ACTIVE, User::MAIN_TENANT, User::SUB_TENANT])]))
            ->assertSuccessful()
            ->assertSee($users);
    }

    /** @test */
    public function an_authorized_user_can_see_all_users(): void
    {
        $this->signIn([], 'manage_users');

        create(User::class, [], 10);

        $users = User::orderBy('lastname')->get()->toJson();

        $this->get(route('api.users',
            ['residentFilter' => json_encode([User::ACTIVE, User::MAIN_TENANT, User::SUB_TENANT])]))
            ->assertSuccessful()
            ->assertSee($users);
    }

    /** @test */
    public function an_unauthorized_user_cannot_see_all_users(): void
    {
        $this->withExceptionHandling()->signIn();

        $this->get(route('api.users',
            ['residentFilter' => json_encode([User::ACTIVE, User::MAIN_TENANT, User::SUB_TENANT])]))
            ->assertStatus(403);
    }

    /** @test */
    public function users_can_be_filtered_by_dorm_name(): void
    {
        $admin = create(User::class, ['house' => 'Dorm A']);

        $this->signInAdmin($admin);

        create(User::class, ['house' => 'Dorm A'], 2);
        create(User::class, ['house' => 'Dorm B'], 2);

        $users = User::where('house', '<>', 'Dorm B')->orderBy('lastname')->get()->toArray();

        $this->get(route('api.users', [
            'houses' => json_encode(['Dorm B']),
            'residentFilter' => json_encode([
                User::ACTIVE,
                User::MAIN_TENANT,
                User::SUB_TENANT,
            ]),
        ]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 3]);
    }

    /** @test */
    public function users_can_be_sorted_by_column_name(): void
    {
        $this->signInAdmin();

        create(User::class, [], 2);

        $users = User::orderBy('firstname')->get()->toArray();

        $this->get(route('api.users', [
            'sort' => json_encode(['fieldName' => 'firstname', 'order' => 'asc']),
            'residentFilter' => json_encode([
                User::ACTIVE,
                User::MAIN_TENANT,
                User::SUB_TENANT,
            ]),
        ]))
            ->assertSuccessful()
            ->assertJson(['data' => $users]);
    }

    /** @test */
    public function sort_order_can_be_changed(): void
    {
        $this->signInAdmin();

        create(User::class, [], 2);

        $users = User::orderBy('lastname', 'desc')->get()->toArray();

        $this->get(route('api.users', [
            'sort' => json_encode(['fieldName' => 'lastname', 'order' => 'desc']),
            'residentFilter' => json_encode([
                User::ACTIVE,
                User::MAIN_TENANT,
                User::SUB_TENANT,
            ]),
        ]))
            ->assertSuccessful()
            ->assertJson(['data' => $users]);
    }

    /** @test */
    public function users_can_be_filtered_by_lastname(): void
    {
        $this->signInAdmin();

        create(User::class, ['lastname' => 'user1']);
        create(User::class, [], 2);

        $users = User::where('lastname', 'LIKE', 'user1%')->orderBy('lastname')->get()->toArray();

        $this->get(route('api.users', [
            'filter' => 'user1',
            'residentFilter' => json_encode([
                User::ACTIVE,
                User::MAIN_TENANT,
                User::SUB_TENANT,
            ]),
        ]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 1]);
    }

    /** @test */
    public function users_can_be_filtered_by_firstname(): void
    {
        $this->signInAdmin();

        create(User::class, ['firstname' => 'user1']);
        create(User::class, [], 2);

        $users = User::where('firstname', 'LIKE', 'user1%')->orderBy('firstname')->get()->toArray();

        $this->get(route('api.users', [
            'filter' => 'user1',
            'residentFilter' => json_encode([
                User::ACTIVE,
                User::MAIN_TENANT,
                User::SUB_TENANT,
            ]),
        ]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 1]);
    }

    /** @test */
    public function users_can_be_filtered_by_username(): void
    {
        $this->signInAdmin();

        create(User::class, ['username' => 'user1']);
        create(User::class, [], 2);

        $users = User::where('username', 'LIKE', 'user1%')->orderBy('username')->get()->toArray();

        $this->get(route('api.users', [
            'filter' => 'user1',
            'residentFilter' => json_encode([
                User::ACTIVE,
                User::MAIN_TENANT,
                User::SUB_TENANT,
            ]),
        ]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 1]);
    }

    /** @test */
    public function users_can_be_filtered_by_email(): void
    {
        $this->signInAdmin();

        create(User::class, ['email' => 'user1']);
        create(User::class, [], 2);

        $users = User::where('email', 'LIKE', 'user1%')->orderBy('email')->get()->toArray();

        $this->get(route('api.users', [
            'filter' => 'user1',
            'residentFilter' => json_encode([
                User::ACTIVE,
                User::MAIN_TENANT,
                User::SUB_TENANT,
            ]),
        ]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 1]);
    }

    /** @test */
    public function only_current_users_can_be_shown(): void
    {
        $this->signInAdmin();

        $deletedUser = create(User::class);
        $deletedUser->delete();

        create(User::class, [], 2);

        $users = User::orderBy('lastname')->get()->toArray();

        $this->get(route('api.users',
            ['residentFilter' => json_encode([User::ACTIVE, User::MAIN_TENANT])]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 3]);
    }

    /** @test */
    public function only_former_users_can_be_shown(): void
    {
        $this->signInAdmin();

        create(User::class)->deactivate();
        create(User::class, [], 2);

        $users = User::onlyInactive()->orderBy('lastname')->get()->toArray();

        $this->get(route('api.users',
            ['residentFilter' => json_encode([User::INACTIVE, User::MAIN_TENANT])]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 1]);
    }

    /** @test */
    public function inactive_and_current_users_can_be_shown(): void
    {
        $this->signInAdmin();

        $deletedUser = create(User::class);
        $deletedUser->deactivate();

        create(User::class, [], 2);

        $users = User::withInactive()->orderBy('lastname')->get()->toArray();

        $this->get(route('api.users',
            ['residentFilter' => json_encode([User::INACTIVE, User::ACTIVE, User::MAIN_TENANT])]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 4]);
    }

    /** @test */
    public function only_current_main_tenants_can_be_shown(): void
    {
        $this->signInAdmin();

        $deletedUser = create(User::class);
        $deletedUser->delete();

        create(User::class, [], 2);
        create(User::class, ['is_subtenant' => true], 2);

        $users = User::where('is_subtenant', false)->orderBy('lastname')->get()->toArray();

        $this->get(route('api.users',
            ['residentFilter' => json_encode([User::ACTIVE, User::MAIN_TENANT])]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 3]);
    }

    /** @test */
    public function only_current_sub_tenants_can_be_shown(): void
    {
        $this->signInAdmin();

        $deletedUser = create(User::class);
        $deletedUser->delete();

        create(User::class, [], 2);
        create(User::class, ['is_subtenant' => true], 2);

        $users = User::where('is_subtenant', true)->orderBy('lastname')->get()->toArray();

        $this->get(route('api.users',
            ['residentFilter' => json_encode([User::ACTIVE, User::SUB_TENANT])]))
            ->assertSuccessful()
            ->assertJson(['data' => $users, 'total' => 2]);
    }

    /** @test */
    public function no_users_shown_when_neither_active_nor_former_tenants_selected(): void
    {
        $this->signInAdmin();

        create(User::class, [], 2);

        $this->get(route('api.users',
            ['residentFilter' => json_encode([User::MAIN_TENANT, User::SUB_TENANT])]))
            ->assertSuccessful()
            ->assertJson([
                'data' => [],
                'total' => 0,
            ]);
    }

    /** @test */
    public function no_users_shown_when_neither_main_nor_sub_tenants_selected(): void
    {
        $this->signInAdmin();

        create(User::class, [], 2);

        $this->get(route('api.users',
            ['residentFilter' => json_encode([User::ACTIVE, User::INACTIVE])]))
            ->assertSuccessful()
            ->assertJson([
                'data' => [],
                'total' => 0,
            ]);
    }

    /** @test */
    public function user_data_includes_total(): void
    {
        $this->signInAdmin();

        create(User::class, [], 60);

        $users = ['data' => User::orderBy('lastname')->get()->toArray(), 'total' => User::all()->count()];

        $this->get(route('api.users',
            ['residentFilter' => json_encode([User::ACTIVE, User::MAIN_TENANT])]))
            ->assertSuccessful()
            ->assertJson([
                'data' => $users['data'],
            ]);
    }

    /** @test */
    public function an_admin_can_update_user(): void
    {
        $this->signInAdmin();

        $user = create(User::class);
        $user->username = 'Newname';

        $this->withExceptionHandling()->post(route('api.users.update', $user->id), $user->toArray())
            ->assertSuccessful();

        $this->assertEquals('Newname', $user->fresh()->username);
    }

    /** @test */
    public function an_authorized_user_can_update_user(): void
    {
        $this->signIn([], 'manage_users');

        $user = create(User::class);
        $user->username = 'Newname';

        $this->post(route('api.users.update', $user->id), $user->toArray())
            ->assertSuccessful();

        $this->assertEquals('Newname', $user->fresh()->username);
    }

    /** @test */
    public function an_unauthorized_user_cannot_update_user(): void
    {
        $this->withExceptionHandling()->signIn();

        $user = create(User::class);
        $oldName = $user->username;
        $user->username = 'Newname';

        $this->post(route('api.users.update', $user->id), $user->toArray())
            ->assertStatus(403);

        $this->assertEquals($oldName, $user->fresh()->username);
        $this->assertNotEquals('Newname', $user->fresh()->username);
    }

    /** @test */
    public function full_room_is_updated_after_user_room_update(): void
    {
        $this->signInAdmin();

        $user = create(User::class);
        ++$user->room;
        $newFullRoom = str_pad($user->floor, 2, 0, STR_PAD_LEFT) . str_pad($user->room, 2, 0,
                STR_PAD_LEFT);

        $this->post(route('api.users.update', $user->id), $user->toArray())
            ->assertSuccessful();

        $this->assertEquals($newFullRoom, $user->fresh()->full_room);
    }
}
