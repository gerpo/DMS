<?php

namespace Tests\Feature;

use Bouncer;
use Silber\Bouncer\Database\Ability;
use Silber\Bouncer\Database\Role;
use Tests\TestCase;

class RoleAbilitiesTest extends TestCase
{
    public function setUp()
    {
        parent::setUp();

        Bouncer::dontCache();
    }

    /** @test */
    public function an_admin_can_add_an_ability_to_a_role(): void
    {
        $this->signInAdmin();

        $role = create(Role::class);
        $ability = create(Ability::class);

        $this->post(route('api.role-abilities.store', ['id' => $role->id]), ['data' => [$ability->toArray()]])
            ->assertSuccessful();

        $this->assertCount(1, $role->getAbilities());

        $this->assertTrue($role->can($ability->name));
    }

    /** @test */
    public function an_admin_can_add_multiple_abilities_to_a_role(): void
    {
        $this->signInAdmin();

        $role = create(Role::class);
        $abilities = create(Ability::class, [], 2);

        $this->post(route('api.role-abilities.store', ['id' => $role->id]), ['data' => $abilities->toArray()])
            ->assertSuccessful();

        $this->assertCount(2, $role->getAbilities());

        $abilities->each(function ($ability, $key) use ($role) {
            $this->assertTrue($role->can($ability->name));
        });
    }

    /** @test */
    public function an_admin_can_remove_an_ability_from_a_role(): void
    {
        $this->signInAdmin();

        $role = create(Role::class);
        $ability = create(Ability::class);

        $role->allow($ability->name);

        $this->assertTrue($role->can($ability->name));

        $this->delete(route('api.role-abilities.destroy', ['id' => $role->id]), ['data' => [$ability->toArray()]])
            ->assertSuccessful();

        $this->assertCount(0, $role->getAbilities());

        $this->assertFalse($role->can($ability->name));
    }

    /** @test */
    public function an_admin_can_remove_multiple_abilities_from_a_role(): void
    {
        $this->signInAdmin();

        $role = create(Role::class);
        $abilities = create(Ability::class, [], 2);

        $abilities->each(function ($ability, $key) use ($role) {
            $role->allow($ability->name);

            $this->assertTrue($role->can($ability->name));
        });

        $this->delete(route('api.role-abilities.destroy', ['id' => $role->id]), ['data' => $abilities->toArray()])
            ->assertSuccessful();

        $this->assertCount(0, $role->getAbilities());

        $abilities->each(function ($ability, $key) use ($role) {
            $this->assertFalse($role->can($ability->name));
        });
    }

    /** @test */
    public function an_authorized_user_can_add_an_ability_to_a_role(): void
    {
        $this->signIn([], 'manage_roles');

        $role = create(Role::class);
        $ability = create(Ability::class);

        $this->post(route('api.role-abilities.store', ['id' => $role->id]), ['data' => [$ability->toArray()]])
            ->assertSuccessful();

        $this->assertCount(1, $role->getAbilities());

        $this->assertTrue($role->can($ability->name));
    }

    /** @test */
    public function an_authorized_user_can_add_multiple_abilities_to_a_role(): void
    {
        $this->signIn([], 'manage_roles');

        $role = create(Role::class);
        $abilities = create(Ability::class, [], 2);

        $this->post(route('api.role-abilities.store', ['id' => $role->id]), ['data' => $abilities->toArray()])
            ->assertSuccessful();

        $this->assertCount(2, $role->getAbilities());

        $abilities->each(function ($ability, $key) use ($role) {
            $this->assertTrue($role->can($ability->name));
        });
    }

    /** @test */
    public function an_authorized_user_can_remove_an_ability_from_a_role(): void
    {
        $this->signIn([], 'manage_roles');

        $role = create(Role::class);
        $ability = create(Ability::class);

        $role->allow($ability->name);

        $this->assertTrue($role->can($ability->name));

        $this->delete(route('api.role-abilities.destroy', ['id' => $role->id]), ['data' => [$ability->toArray()]])
            ->assertSuccessful();

        $this->assertCount(0, $role->getAbilities());

        $this->assertFalse($role->can($ability->name));
    }

    /** @test */
    public function an_authorized_user_can_remove_multiple_abilities_from_a_role(): void
    {
        $this->signIn([], 'manage_roles');

        $role = create(Role::class);
        $abilities = create(Ability::class, [], 2);

        $abilities->each(function ($ability, $key) use ($role) {
            $role->allow($ability->name);

            $this->assertTrue($role->can($ability->name));
        });

        $this->delete(route('api.role-abilities.destroy', ['id' => $role->id]), ['data' => $abilities->toArray()])
            ->assertSuccessful();

        $this->assertCount(0, $role->getAbilities());

        $abilities->each(function ($ability, $key) use ($role) {
            $this->assertFalse($role->can($ability->name));
        });
    }

    /** @test */
    public function an_unauthorized_user_cannot_add_abilities_to_a_role(): void
    {
        $this->withExceptionHandling()->signIn();

        $role = create(Role::class);
        $ability = create(Ability::class);

        $this->post(route('api.role-abilities.store', ['id' => $role->id]), ['data' => [$ability->toArray()]])
            ->assertStatus(403);

        $this->assertCount(0, $role->getAbilities());

        $this->assertFalse($role->can($ability->name));
    }

    /** @test */
    public function an_unauthorized_user_cannot_remove_abilities_from_a_role(): void
    {
        $this->withExceptionHandling()->signIn();

        $role = create(Role::class);
        $ability = create(Ability::class);

        $role->allow($ability->name);

        $this->assertTrue($role->can($ability->name));

        $this->delete(route('api.role-abilities.destroy', ['id' => $role->id]), ['data' => [$ability->toArray()]])
            ->assertStatus(403);

        $this->assertCount(1, $role->getAbilities());

        $this->assertTrue($role->can($ability->name));
    }

    /** @test */
    public function data_key_is_required_to_add_ability(): void
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $role = create(Role::class);

        $this->post(route('api.role-abilities.store', ['id' => $role->id]), ['data' => null])
            ->assertSessionHasErrors('data')
            ->assertRedirect(route('roles'));

        $this->assertCount(0, $role->getAbilities());
    }

    /** @test */
    public function data_key_is_required_to_remove_ability(): void
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $role = create(Role::class);

        $this->delete(route('api.role-abilities.destroy', ['id' => $role->id]), ['data' => null])
            ->assertSessionHasErrors('data')
            ->assertRedirect(route('roles'));

        $this->assertCount(0, $role->getAbilities());
    }

    /** @test */
    public function data_key_to_add_ability_must_be_an_array(): void
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $role = create(Role::class);
        $ability = create(Ability::class);

        $this->post(route('api.role-abilities.store', ['id' => $role->id]), ['data' => $ability->name])
            ->assertSessionHasErrors('data')
            ->assertRedirect(route('roles'));

        $this->assertCount(0, $role->getAbilities());

        $this->assertFalse($role->can($ability->name));
    }

    /** @test */
    public function data_key_to_remove_ability_must_be_an_array(): void
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $role = create(Role::class);
        $ability = create(Ability::class);

        $role->allow($ability->name);

        $this->assertTrue($role->can($ability->name));

        $this->delete(route('api.role-abilities.destroy', ['id' => $role->id]), ['data' => $ability->name])
            ->assertSessionHasErrors('data')
            ->assertRedirect(route('roles'));

        $this->assertCount(1, $role->getAbilities());

        $this->assertTrue($role->can($ability->name));
    }

    /** @test */
    public function ability_data_to_add_must_be_wrapped_in_an_array(): void
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $role = create(Role::class);
        $ability = create(Ability::class);

        $this->post(route('api.role-abilities.store', ['id' => $role->id]), ['data' => $ability->toArray()])
            ->assertSessionHasErrors('data.*')
            ->assertRedirect(route('roles'));

        $this->assertCount(0, $role->getAbilities());

        $this->assertFalse($role->can($ability->name));
    }

    /** @test */
    public function ability_data_to_remove_must_be_wrapped_in_an_array(): void
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $role = create(Role::class);
        $ability = create(Ability::class);

        $role->allow($ability->name);

        $this->delete(route('api.role-abilities.destroy', ['id' => $role->id]), ['data' => $ability->toArray()])
            ->assertSessionHasErrors('data.*')
            ->assertRedirect(route('roles'));

        $this->assertCount(1, $role->getAbilities());

        $this->assertTrue($role->can($ability->name));
    }

    /** @test */
    public function ability_data_to_add_must_be_an_array(): void
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $role = create(Role::class);
        $ability = create(Ability::class);

        $this->post(route('api.role-abilities.store', ['id' => $role->id]), ['data' => [$ability->name]])
            ->assertSessionHasErrors('data.*')
            ->assertRedirect(route('roles'));

        $this->assertCount(0, $role->getAbilities());

        $this->assertFalse($role->can($ability->name));
    }

    /** @test */
    public function ability_data_to_remove_must_be_an_array(): void
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $role = create(Role::class);
        $ability = create(Ability::class);

        $role->allow($ability->name);

        $this->assertTrue($role->can($ability->name));

        $this->delete(route('api.role-abilities.destroy', ['id' => $role->id]), ['data' => [$ability->name]])
            ->assertSessionHasErrors('data.*')
            ->assertRedirect(route('roles'));

        $this->assertCount(1, $role->getAbilities());

        $this->assertTrue($role->can($ability->name));
    }

    /** @test */
    public function ability_name_to_add_is_required(): void
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $role = create(Role::class);

        $this->post(route('api.role-abilities.store', ['id' => $role->id]), ['data' => ['name' => null]])
            ->assertSessionHasErrors('data.*.name')
            ->assertRedirect(route('roles'));

        $this->assertCount(0, $role->getAbilities());
    }

    /** @test */
    public function ability_name_to_remove_is_required(): void
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $role = create(Role::class);
        $ability = create(Ability::class);

        $role->allow($ability->name);

        $this->assertTrue($role->can($ability->name));

        $this->delete(route('api.role-abilities.destroy', ['id' => $role->id]), ['data' => ['name' => null]])
            ->assertSessionHasErrors('data.*.name')
            ->assertRedirect(route('roles'));

        $this->assertCount(1, $role->getAbilities());

        $this->assertTrue($role->can($ability->name));
    }

    /** @test */
    public function ability_name_to_add_must_exists(): void
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $role = create(Role::class);

        $this->post(route('api.role-abilities.store', ['id' => $role->id]), ['data' => ['name' => 'not_existing']])
            ->assertSessionHasErrors('data.*.name')
            ->assertRedirect(route('roles'));

        $this->assertCount(0, $role->getAbilities());
    }

    /** @test */
    public function ability_name_to_remove_must_exists(): void
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $role = create(Role::class);
        $ability = create(Ability::class);

        $role->allow($ability->name);

        $this->delete(route('api.role-abilities.destroy', ['id' => $role->id]), ['data' => ['name' => 'not_existing']])
            ->assertSessionHasErrors('data.*.name')
            ->assertRedirect(route('roles'));

        $this->assertCount(1, $role->getAbilities());
    }
}
