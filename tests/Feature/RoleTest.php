<?php

namespace Tests\Feature;

use Auth;
use Silber\Bouncer\Database\Role;
use Tests\TestCase;

class RoleTest extends TestCase
{
    /** @test */
    public function an_admin_can_create_a_new_role()
    {
        $this->signInAdmin();

        $this->post(route('api.roles.store'), [
            'name' => 'role_a',
            'title' => 'A new role',
        ])->assertSuccessful();

        $role = Role::where('name', 'role_a')->first();

        $this->assertNotNull($role);

        $this->assertEquals('role_a', $role->name);

        $this->assertEquals('A new role', $role->title);
    }

    /** @test */
    public function an_authorized_user_can_create_new_roles()
    {
        $this->signIn();

        Auth::user()->allow('manage_roles');

        $this->post(route('api.roles.store'), [
            'name' => 'role_a',
            'title' => 'A new role',
        ]);

        $role = Role::where('name', 'role_a')->first();

        $this->assertNotNull($role);

        $this->assertEquals('role_a', $role->name);

        $this->assertEquals('A new role', $role->title);
    }

    /** @test */
    public function an_unauthorized_user_cannot_create_new_roles()
    {
        $this->withExceptionHandling()->signIn();

        $this->from(route('roles'));

        $this->post(route('api.roles.store'), [
            'name' => 'role_a',
            'title' => 'A new role',
        ])
            ->assertStatus(403);

        $role = Role::where('name', 'role_a')->first();

        $this->assertNull($role);
    }

    /** @test */
    public function a_role_requires_a_name()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $this->post(route('api.roles.store'), $this->validParams([
            'name' => null,
        ]))
            ->assertRedirect(route('roles'))
            ->assertSessionHasErrors('name');

        $this->assertNull(Role::where('title', 'A new role')->first());
    }

    private function validParams($overwrites = [])
    {
        return array_merge([
            'name' => 'role_a',
            'title' => 'A new role',
        ], $overwrites);
    }

    /** @test */
    public function role_name_cannot_exceed_20_chars()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $this->post(route('api.roles.store'), $this->validParams([
            'name' => str_repeat('a', 21),
        ]))
            ->assertRedirect(route('roles'))
            ->assertSessionHasErrors('name');

        $this->assertNull(Role::where('title', 'A new role')->first());
    }

    /** @test */
    public function a_role_name_is_unique()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $this->assertNotNull(Role::where('name', 'admin')->first());

        $this->post(route('api.roles.store'), $this->validParams([
            'name' => 'admin',
        ]))
            ->assertRedirect(route('roles'))
            ->assertSessionHasErrors('name');

        $this->assertNull(Role::where('title', 'A new role')->first());
    }

    /** @test */
    public function a_role_requires_a_title()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $this->post(route('api.roles.store'), $this->validParams([
            'title' => null,
        ]))
            ->assertRedirect(route('roles'))
            ->assertSessionHasErrors('title');

        $this->assertNull(Role::where('name', 'role_a')->first());
    }

    /** @test */
    public function role_title_cannot_exceed_255_chars()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('roles'));

        $this->post(route('api.roles.store'), $this->validParams([
            'title' => str_repeat('a', 256),
        ]))
            ->assertRedirect(route('roles'))
            ->assertSessionHasErrors('title');

        $this->assertNull(Role::where('name', 'role_a')->first());
    }
}
