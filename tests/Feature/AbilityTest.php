<?php

namespace Tests\Feature;

use Auth;
use Tests\TestCase;
use Silber\Bouncer\Database\Ability;

class AbilityTest extends TestCase
{
    /** @test */
    public function an_admin_can_create_new_ability()
    {
        $this->signInAdmin();

        $this->post(route('abilities.store'), [
            'name' => 'ability_a',
            'title' => 'A new ability',
        ])->assertSuccessful();

        $ability = Ability::where('name', 'ability_a')->first();

        $this->assertNotNull($ability);

        $this->assertEquals('A new ability', $ability->title);
    }

    /** @test */
    public function an_authorized_user_can_create_new_ability()
    {
        $this->signIn();

        Auth::user()->allow('manage_roles');

        $this->post(route('abilities.store'), [
            'name' => 'ability_a',
            'title' => 'A new ability',
        ])->assertSuccessful();

        $ability = Ability::where('name', 'ability_a')->first();

        $this->assertNotNull($ability);

        $this->assertEquals('A new ability', $ability->title);
    }

    /** @test */
    public function an_unauthorized_user_cannot_create_new_ability()
    {
        $this->withExceptionHandling()->signIn();

        $this->post(route('abilities.store'), [
            'name' => 'ability_a',
            'title' => 'A new ability',
        ])->assertStatus(403);

        $this->assertCount(0, Ability::all());
    }

    /** @test */
    public function ability_requires_a_name()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('abilities'));

        $this->post(route('abilities.store'), $this->validParams([
            'name' => null,
        ]))
            ->assertRedirect(route('abilities'))
            ->assertSessionHasErrors('name');

        $this->assertCount(0, Ability::all());
    }

    /** @test */
    public function ability_name_is_unique()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('abilities'));

        $this->post(route('abilities.store'), $this->validParams());

        $this->assertNotNull(Ability::where('name', 'ability_a')->first());

        $this->post(route('abilities.store'), $this->validParams([
            'name' => 'ability_a',
            'title' => 'different title',
        ]))
            ->assertRedirect(route('abilities'))
            ->assertSessionHasErrors('name');

        $this->assertCount(1, Ability::all());
    }

    /** @test */
    public function ability_name_cannot_exceed_20_chars()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('abilities'));

        $this->post(route('abilities.store'), $this->validParams([
            'name' => str_repeat('a', 21),
        ]))
            ->assertRedirect(route('abilities'))
            ->assertSessionHasErrors('name');

        $this->assertCount(0, Ability::all());
    }

    /** @test */
    public function ability_requires_a_title()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('abilities'));

        $this->post(route('abilities.store'), $this->validParams([
            'title' => null,
        ]))
            ->assertRedirect(route('abilities'))
            ->assertSessionHasErrors('title');

        $this->assertCount(0, Ability::all());
    }

    /** @test */
    public function ability_title_cannot_exceed_255_chars()
    {
        $this->withExceptionHandling()
            ->signInAdmin()
            ->from(route('abilities'));
        //
        $this->post(route('abilities.store'), $this->validParams([
            'title' => str_repeat('a', 256),
        ]))
            ->assertRedirect(route('abilities'))
            ->assertSessionHasErrors('title');

        $this->assertCount(0, Ability::all());
    }

    private function validParams($overwrites = [])
    {
        return array_merge([
            'name' => 'ability_a',
            'title' => 'A new ability',
        ], $overwrites);
    }
}
