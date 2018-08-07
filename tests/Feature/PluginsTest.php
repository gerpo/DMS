<?php

namespace Tests\Feature;

use Gerpo\Plugisto\Models\Plugisto;
use Tests\TestCase;

class PluginsTest extends TestCase
{
    /** @test */
    public function an_admin_can_delete_a_plugin()
    {
        $this->signInAdmin();

        $plugin = Plugisto::create($this->validParams());

        $this->assertDatabaseHas('plugisto', $plugin->toArray());

        $this->delete(route('api.plugins.destroy', $plugin->id))
            ->assertSuccessful();

        $this->assertDatabaseMissing('plugisto', $plugin->toArray());
    }

    /** @test */
    public function an_admin_can_activate_a_plugin()
    {
        $this->signInAdmin();

        $plugin = Plugisto::create($this->validParams());

        $this->assertFalse($plugin->fresh()->is_active);

        $this->patch(route('api.plugins.update', $plugin->id), ['is_active' => true])
            ->assertSuccessful();

        $this->assertTrue($plugin->fresh()->is_active);
    }

    /** @test */
    public function an_admin_can_deactivate_a_plugin()
    {
        $this->signInAdmin();

        $plugin = Plugisto::create($this->validParams(['is_active' => true]));

        $this->assertTrue($plugin->fresh()->is_active);

        $this->patch(route('api.plugins.update', $plugin->id), ['is_active' => false])
            ->assertSuccessful();

        $this->assertFalse($plugin->fresh()->is_active);
    }

    /** @test */
    public function an_authorized_user_can_delete_a_plugin()
    {
        $this->signIn( null , 'manage-plugins');

        $plugin = Plugisto::create($this->validParams());

        $this->assertDatabaseHas('plugisto', $plugin->toArray());

        $this->delete(route('api.plugins.destroy', $plugin->id))
            ->assertSuccessful();

        $this->assertDatabaseMissing('plugisto', $plugin->toArray());
    }

    /** @test */
    public function an_authorized_user_can_activate_plugin()
    {
        $this->signIn(null, 'manage-plugins');

        $plugin = Plugisto::create($this->validParams());

        $this->assertFalse($plugin->fresh()->is_active);

        $this->patch(route('api.plugins.update', $plugin->id), ['is_active' => true])
            ->assertSuccessful();

        $this->assertTrue($plugin->fresh()->is_active);
    }

    /** @test */
    public function an_authorized_user_can_deactivate_plugin()
    {
        $this->signIn(null, 'manage-plugins');

        $plugin = Plugisto::create($this->validParams(['is_active' => true]));

        $this->assertTrue($plugin->fresh()->is_active);

        $this->patch(route('api.plugins.update', $plugin->id), ['is_active' => false])
            ->assertSuccessful();

        $this->assertFalse($plugin->fresh()->is_active);
    }

    /** @test */
    public function an_unauthorized_user_cannot_delete_a_plugin()
    {
        $this->withExceptionHandling()->signIn();

        $plugin = Plugisto::create($this->validParams());

        $this->assertDatabaseHas('plugisto', $plugin->toArray());

        $this->delete(route('api.plugins.destroy', $plugin->id))
            ->assertStatus(403);

        $this->assertDatabaseHas('plugisto', $plugin->toArray());
    }

    /** @test */
    public function an_unauthorized_user_cannnot_activate_plugin()
    {
        $this->withExceptionHandling()->signIn();

        $plugin = Plugisto::create($this->validParams());

        $this->assertFalse($plugin->fresh()->is_active);

        $this->patch(route('api.plugins.update', $plugin->id), ['is_active' => true])
            ->assertStatus(403);

        $this->assertFalse($plugin->fresh()->is_active);
    }

    /** @test */
    public function an_unauthorized_user_cannot_deactivate_plugin()
    {
        $this->withExceptionHandling()->signIn();

        $plugin = Plugisto::create($this->validParams(['is_active' => true]));

        $this->assertTrue($plugin->fresh()->is_active);

        $this->patch(route('api.plugins.update', $plugin->id), ['is_active' => false])
            ->assertStatus(403);

        $this->assertTrue($plugin->fresh()->is_active);
    }

    private function validParams($overrides = [])
    {
        return array_merge([
            'name' => 'TestPlugin',
            'description' => 'A test plugin.',
            'route' => '/',
            'namespace' => 'Gerpo/test',
            'is_active' => false,
            'manually_added' => false,
        ], $overrides);
    }
}
