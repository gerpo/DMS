<?php

namespace Tests\Unit;

use App\Events\UserEmailChanged;
use App\Listeners\SendEmailConfirmationEmail;
use App\Mail\ConfirmEmailMail;
use App\User;
use Bouncer;
use Event;
use Gerpo\Plugisto\Models\Plugisto;
use Mail;
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
    public function after_email_update_user_is_not_confirmed(): void
    {
        $user = create(User::class);

        $newEmail = 'newemail@dms.test';

        $user->email = $newEmail;
        $user->save();

        $this->assertFalse($user->fresh()->confirmed);
    }

    /** @test */
    public function after_email_update_confirmation_token_is_set(): void
    {
        $user = create(User::class);
        $newEmail = 'newemail@dms.test';
        $user->confirm();

        $this->assertNull($user->confirmation_token);

        $user->email = $newEmail;
        $user->save();

        $this->assertNotNull($user->fresh()->confirmation_token);
    }

    /** @test */
    public function after_email_update_UserEmailChanged_event_fired(): void
    {
        Event::fake([UserEmailChanged::class]);

        $user = create(User::class);

        $newEmail = 'newemail@dms.test';

        $user->email = $newEmail;
        $user->save();

        Event::assertDispatched(UserEmailChanged::class, function ($event) use ($user) {
            return $event->user === $user;
        });
    }

    /** @test */
    public function after_email_update_email_confirmation_email_send(): void
    {
        Mail::fake();

        $user = create(User::class);

        $newEmail = 'newemail@dms.test';

        $user->email = $newEmail;
        $user->save();

        Mail::assertQueued(ConfirmEmailMail::class, function ($event) use ($user) {
            return $event->user === $user;
        });
    }

    /** @test */
    public function a_user_is_assigned_member_role_after_creation(): void
    {
        $user = create(User::class);

        $this->assertTrue($user->isA('member'));
    }

    /** @test */
    public function a_user_of_owner_dorm_is_assigned_resident_role_after_creation(): void
    {
        $user = create(User::class, ['house' => config('dms.owner_dorm')]);

        $this->assertTrue($user->isA('resident'));
    }

    /** @test */
    public function a_user_of_not_owner_dorm_is_not_assigned_resident_role_after_creation(): void
    {
        $user = create(User::class, ['house' => 'Not Owner Dorm']);

        $this->assertFalse($user->isA('resident'));
    }

    /** @test */
    public function a_user_is_assigned_resident_role_if_changed_to_owner_dorm(): void
    {
        $user = create(User::class, ['house' => 'Not Owner Dorm']);

        $user->house = config('dms.owner_dorm');
        $user->save();

        $this->assertTrue($user->isA('resident'));
    }

    /** @test */
    public function a_user_is_retracted_resident_role_if_changed_to_not_owner_dorm(): void
    {
        $user = create(User::class, ['house' => config('dms.owner_dorm')]);

        $this->assertTrue($user->isA('resident'));

        $user->house = 'Not Owner Dorm';
        $user->save();

        $this->assertFalse($user->isA('resident'));
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
