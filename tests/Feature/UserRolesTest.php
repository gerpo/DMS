<?php

namespace Tests\Feature;

use App\User;
use Bouncer;
use Silber\Bouncer\Database\Role;
use Tests\TestCase;

class UserRolesTest extends TestCase
{
    public function setUp()
    {
        parent::setUp();

        Bouncer::dontCache();
    }

    /** @test */
    public function an_admin_can_assign_a_role_to_a_user()
    {
        $this->signInAdmin();

        $user = create(User::class);
        $role = create(Role::class);

        $this->post(route('user-roles.store', ['id' => $user->id]), ['data' => [$role->toArray()]])
            ->assertSuccessful();

        $this->assertTrue($user->isA($role->name));
    }

    /** @test */
    public function an_admin_can_assign_multiple_roles_to_a_user()
    {
        $this->signInAdmin();

        $user = create(User::class);
        $roles = create(Role::class, [], 2);

        $this->post(route('user-roles.store', ['id' => $user->id]), ['data' => $roles->toArray()])
            ->assertSuccessful();

        $roles->each(function($role, $key) use ($user) {
            $this->assertTrue($user->isA($role->name));
        });
    }

    /** @test */
    public function an_admin_can_retract_a_role_from_a_user()
    {
        $this->signInAdmin();

        $user = create(User::class);
        $role = create(Role::class);

        $user->assign($role->name);

        $this->assertTrue($user->isA($role->name));

        $this->delete(route('user-roles.destroy', ['id' => $user->id]), ['data' => [$role->toArray()]])
            ->assertSuccessful();

        $this->assertFalse($user->isA($role->name));
    }

    /** @test */
    public function an_admin_can_retract_multiple_roles_from_a_user()
    {
        $this->signInAdmin();

        $user = create(User::class);
        $roles = create(Role::class, [], 2);

        $roles->each(function($role, $key) use ($user) {
            $user->assign($role->name);

            $this->assertTrue($user->isA($role->name));
        });

        $this->delete(route('user-roles.destroy', ['id' => $user->id]), ['data' => $roles->toArray()])
            ->assertSuccessful();

        $roles->each(function($role, $key) use ($user) {
            $this->assertFalse($user->isA($role->name));
        });
    }

    /** @test */
    public function an_authorized_user_can_assign_a_role_to_a_user()
    {
        $this->signIn([], 'manage_users');

        $user = create(User::class);
        $role = create(Role::class);

        $this->post(route('user-roles.store', ['id' => $user->id]), ['data' => [$role->toArray()]])
            ->assertSuccessful();

        $this->assertTrue($user->isA($role->name));
    }

    /** @test */
    public function an_authorized_user_can_assign_multiple_roles_to_a_user()
    {
        $this->signIn([], 'manage_users');

        $user = create(User::class);
        $roles = create(Role::class, [], 2);

        $this->post(route('user-roles.store', ['id' => $user->id]), ['data' => $roles->toArray()])
            ->assertSuccessful();

        $roles->each(function($role, $key) use ($user) {
            $this->assertTrue($user->isA($role->name));
        });
    }

    /** @test */
    public function an_authorized_user_can_retract_a_role_from_a_user()
    {
        $this->signIn([], 'manage_users');

        $user = create(User::class);
        $role = create(Role::class);

        $user->assign($role->name);

        $this->assertTrue($user->isA($role->name));

        $this->delete(route('user-roles.destroy', ['id' => $user->id]), ['data' => [$role->toArray()]])
            ->assertSuccessful();

        $this->assertFalse($user->isA($role->name));
    }

    /** @test */
    public function an_authorized_user_can_retract_multiple_roles_from_a_user()
    {
        $this->signIn([], 'manage_users');

        $user = create(User::class);
        $roles = create(Role::class, [], 2);

        $roles->each(function($role, $key) use ($user) {
            $user->assign($role->name);

            $this->assertTrue($user->isA($role->name));
        });

        $this->delete(route('user-roles.destroy', ['id' => $user->id]), ['data' => $roles->toArray()])
            ->assertSuccessful();

        $roles->each(function($role, $key) use ($user) {
            $this->assertFalse($user->isA($role->name));
        });
    }

    /** @test */
    public function an_unauthorized_user_cannot_assign_a_role_to_a_user()
    {
        $this->withExceptionHandling()->signIn();

        $user = create(User::class);
        $role = create(Role::class);

        $this->post(route('user-roles.store', ['id' => $user->id]), ['data' => [$role->toArray()]])
            ->assertStatus(403);

        $this->assertFalse($user->isA($role->name));
    }

    /** @test */
    public function an_unauthorized_user_cannot_retract_a_role_from_a_user()
    {
        $this->withExceptionHandling()->signIn();

        $user = create(User::class);
        $role = create(Role::class);

        $user->assign($role->name);

        $this->assertTrue($user->isA($role->name));

        $this->delete(route('user-roles.destroy', ['id' => $user->id]), ['data' => [$role->toArray()]])
            ->assertStatus(403);

        $this->assertTrue($user->isA($role->name));
    }

    /** @test */
    public function data_key_is_required_to_add_role()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('users'));

        $user = create(User::class);

        $this->post(route('user-roles.store', ['id' => $user->id]), ['data' => null])
            ->assertSessionHasErrors('data')
            ->assertRedirect(route('users'));
    }

    /** @test */
    public function data_key_is_required_to_remove_role()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('users'));

        $user = create(User::class);

        $this->delete(route('user-roles.destroy', ['id' => $user->id]), ['data' => null])
            ->assertSessionHasErrors('data')
            ->assertRedirect(route('users'));
    }

    /** @test */
    public function data_key_to_add_role_must_be_an_array()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('users'));

        $user = create(User::class);
        $role = create(Role::class);

        $this->post(route('user-roles.store', ['id' => $user->id]), ['data' => $role->name])
            ->assertSessionHasErrors('data')
            ->assertRedirect(route('users'));

        $this->assertFalse($user->isA($role->name));
    }

    /** @test */
    public function data_key_to_remove_role_must_be_an_array()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('users'));

        $user = create(User::class);
        $role = create(Role::class);

        $user->assign($role->name);

        $this->assertTrue($user->isA($role->name));

        $this->delete(route('user-roles.destroy', ['id' => $user->id]), ['data' => $role->name])
            ->assertSessionHasErrors('data')
            ->assertRedirect(route('users'));

        $this->assertTrue($user->isA($role->name));
    }

    /** @test */
    public function role_data_to_add_must_be_wrapped_in_an_array()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('users'));

        $user = create(User::class);
        $role = create(Role::class);

        $this->post(route('user-roles.store', ['id' => $user->id]), ['data' => $role->toArray()])
            ->assertSessionHasErrors('data.*')
            ->assertRedirect(route('users'));

        $this->assertFalse($user->isA($role->name));
    }

    /** @test */
    public function role_data_to_remove_must_be_wrapped_in_an_array()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('users'));

        $user = create(User::class);
        $role = create(Role::class);

        $user->assign($role->name);

        $this->assertTrue($user->isA($role->name));

        $this->delete(route('user-roles.destroy', ['id' => $user->id]), ['data' => $role->toArray()])
            ->assertSessionHasErrors('data.*')
            ->assertRedirect(route('users'));

        $this->assertTrue($user->isA($role->name));
    }

    /** @test */
    public function role_data_to_add_must_be_an_array()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('users'));

        $user = create(User::class);
        $role = create(Role::class);

        $this->post(route('user-roles.store', ['id' => $user->id]), ['data' => [$role->name]])
            ->assertSessionHasErrors('data.*')
            ->assertRedirect(route('users'));

        $this->assertFalse($user->isA($role->name));
    }

    /** @test */
    public function role_data_to_remove_must_be_an_array()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('users'));

        $user = create(User::class);
        $role = create(Role::class);

        $user->assign($role->name);

        $this->assertTrue($user->isA($role->name));

        $this->delete(route('user-roles.destroy', ['id' => $user->id]), ['data' => [$role->name]])
            ->assertSessionHasErrors('data.*')
            ->assertRedirect(route('users'));

        $this->assertTrue($user->isA($role->name));
    }

    /** @test */
    public function role_name_to_add_is_required()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('users'));

        $user = create(User::class);

        $this->post(route('user-roles.store', ['id' => $user->id]), ['data' => ['name' => null]])
            ->assertSessionHasErrors('data.*.name')
            ->assertRedirect(route('users'));
    }

    /** @test */
    public function role_name_to_remove_is_required()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('users'));

        $user = create(User::class);
        $role = create(Role::class);

        $user->assign($role->name);

        $this->assertTrue($user->isA($role->name));

        $this->delete(route('user-roles.destroy', ['id' => $user->id]), ['data' => ['name' => null]])
            ->assertSessionHasErrors('data.*.name')
            ->assertRedirect(route('users'));

        $this->assertTrue($user->isA($role->name));
    }

    /** @test */
    public function role_name_to_add_must_exists()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('users'));

        $user = create(User::class);

        $this->post(route('user-roles.store', ['id' => $user->id]), ['data' => ['name' => 'not_existing']])
            ->assertSessionHasErrors('data.*.name')
            ->assertRedirect(route('users'));
    }

    /** @test */
    public function role_name_to_remove_must_exists()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('users'));

        $user = create(User::class);
        $role = create(Role::class);

        $user->assign($role->name);

        $this->assertTrue($user->isA($role->name));

        $this->delete(route('user-roles.destroy', ['id' => $user->id]), ['data' => ['name' => 'not_existing']])
            ->assertSessionHasErrors('data.*.name')
            ->assertRedirect(route('users'));

        $this->assertTrue($user->isA($role->name));
    }
}
