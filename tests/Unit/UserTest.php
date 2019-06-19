<?php


namespace Tests\Unit;


use App\User;
use Bouncer;
use Gerpo\Plugisto\Models\Plugisto;
use Tests\TestCase;

class UserTest extends TestCase
{
    /** @test */
    public function a_users_first_name_is_saved_as_title_case(): void
    {
        $user = create(User::class, ['firstname' => 'mIxEdCaSe']);

        $this->assertEquals('Mixedcase', $user->firstname);
        $this->assertNotEquals('mIxEdCaSe', $user->firstname);
    }

    /** @test */
    public function a_users_last_name_is_saved_as_title_case(): void
    {
        $user = create(User::class, ['lastname' => 'mIxEdCaSe']);

        $this->assertEquals('Mixedcase', $user->lastname);
        $this->assertNotEquals('mIxEdCaSe', $user->lastname);
    }

    /** @test */
    public function users_full_room_is_padded(): void
    {
        $user = create(User::class, ['room' => 1, 'floor' => 2]);

        $this->assertEquals(201, $user->refresh()->full_room);
    }

    /** @test */
    public function a_user_can_be_confirmed(): void
    {
        $user = create(User::class, ['confirmed' => false]);

        $this->assertFalse($user->confirmed);

        $user->confirm();

        $this->assertTrue($user->confirmed);
    }

    /** @test */
    public function a_user_can_fetch_all_his_permissions(): void
    {
        $user = create(User::class);

        $this->assertEmpty($user->permissionArray());

        $user->allow('permission_a');
        $user->allow('permission_b');

        $this->assertEquals(['permission_a', 'permission_b'], $user->permissionArray());
    }

    /** @test */
    public function a_user_can_fetch_all_allowed_packages(): void
    {
        $user = create(User::class);

        $user->allow('manage_users');

        $this->assertEquals(Plugisto::where('needed_permission', 'manage_users')->get(), $user->packages());
    }

    /** @test */
    public function a_admin_user_can_fetch_all_packages(): void
    {
        $user = create(User::class);

        $user->assign('admin');

        $this->assertEquals(Plugisto::all(), $user->packages());
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->artisan('db:seed', ['--class' => 'PlugistoTableSeeder']);
        Bouncer::dontCache();
    }
}