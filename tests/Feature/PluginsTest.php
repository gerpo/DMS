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
