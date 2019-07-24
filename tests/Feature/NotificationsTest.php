<?php

namespace Tests\Feature;

use App\Mail\NotificationMail;
use App\Mail\RegularMail;
use App\Notification;
use App\User;
use Event;
use Mail;
use Tests\TestCase;

class NotificationsTest extends TestCase
{
    /** @test */
    public function notifications_route_returns_right_view(): void
    {
        $this->signInAdmin();

        $this->get(route('notifications'))
            ->assertSuccessful()
            ->assertViewIs('notifications');
    }

    /** @test */
    public function notifications_route_returns_active_notifications_to_view(): void
    {
        $this->signInAdmin();

        $this->get(route('notifications'))
            ->assertSuccessful()
            ->assertViewHas('notifications');
    }

    /** @test */
    public function an_admin_can_access_notifications_url(): void
    {
        $this->signInAdmin();

        $this->get(route('notifications'))
            ->assertSuccessful()
            ->assertViewIs('notifications');
    }

    /** @test */
    public function an_authorized_user_can_access_notifications_url(): void
    {
        $user = create(User::class);
        $user->allow('create_notifications');

        $this->signIn($user);

        $this->get(route('notifications'))
            ->assertSuccessful()
            ->assertViewIs('notifications');
    }

    /** @test */
    public function an_unauthorized_user_cannot_access_notifications_url(): void
    {
        $user = create(User::class);

        $this->withExceptionHandling()->signIn($user);

        $this->get(route('notifications'))
            ->assertStatus(403);
    }

    /** @test */
    public function an_admin_can_create_a_new_notification(): void
    {
        $this->signInAdmin();

        $notification = [
            'title' => "Test Title",
            'message' => "Test Message",
            'is_active' => true,
        ];

        $this->post(route('notifications.store'), $notification)
            ->assertSuccessful();

        $this->assertDatabaseHas('notifications', $notification);
    }

    /** @test */
    public function an_authorized_can_create_a_new_notification(): void
    {
        $user = create(User::class);
        $user->allow('create_notifications');

        $this->signIn($user);

        $notification = [
            'title' => "Test Title",
            'message' => "Test Message",
            'is_active' => true,
        ];

        $this->post(route('notifications.store'), $notification)
            ->assertSuccessful();

        $this->assertDatabaseHas('notifications', $notification);
    }

    /** @test */
    public function an_unauthorized_cannot_create_a_new_notification(): void
    {
        $this->withExceptionHandling()->signIn();

        $notification = [
            'title' => "Test Title",
            'message' => "Test Message",
            'is_active' => true,
        ];

        $this->post(route('notifications.store'), $notification)
            ->assertStatus(403);

        $this->assertDatabaseMissing('notifications', $notification);
    }

    /** @test */
    public function an_admin_can_publish_a_notification(): void
    {
        $user = create(User::class)->assign('admin');
        $this->signInAdmin($user);

        $notification = create(Notification::class);

        $this->assertFalse($notification->is_active);

        $this->patch(route('notifications.update', $notification->id), ['is_active' => true])
            ->assertSuccessful();

        $this->assertTrue($notification->fresh()->is_active);
    }

    /** @test */
    public function an_authorized_user_can_publish_a_notification(): void
    {
        $user = create(User::class);
        $user->allow('create_notifications');
        $this->signIn($user);

        $notification = create(Notification::class);

        $this->assertFalse($notification->is_active);

        $this->patch(route('notifications.update', $notification->id), ['is_active' => true])
            ->assertSuccessful();

        $this->assertTrue($notification->fresh()->is_active);
    }

    /** @test */
    public function an_unauthorized_user_cannot_publish_a_notification(): void
    {
        $this->withExceptionHandling()->signIn();

        $notification = create(Notification::class);
        $this->assertFalse($notification->is_active);

        $this->patch(route('notifications.update', $notification->id), ['is_active' => true])
            ->assertStatus(403);

        $this->assertFalse($notification->fresh()->is_active);
    }

    /** @test */
    public function an_admin_can_delete_a_notification(): void
    {
        $user = create(User::class)->assign('admin');
        $this->signInAdmin($user);

        $notification = create(Notification::class);

        $this->assertDatabaseHas('notifications', $notification->toArray());

        $this->delete(route('notifications.destroy', $notification->id))
            ->assertSuccessful();

        $this->assertDatabaseMissing('notifications', $notification->toArray());
    }

    /** @test */
    public function an_authorized_user_can_delete_a_notification(): void
    {
        $user = create(User::class);
        $user->allow('create_notifications');
        $this->signIn($user);

        $notification = create(Notification::class);

        $this->assertDatabaseHas('notifications', $notification->toArray());

        $this->delete(route('notifications.destroy', $notification->id))
            ->assertSuccessful();

        $this->assertDatabaseMissing('notifications', $notification->toArray());
    }

    /** @test */
    public function an_unauthorized_user_cannot_delete_a_notification(): void
    {
        $this->withExceptionHandling()->signIn();

        $notification = create(Notification::class);

        $this->assertDatabaseHas('notifications', $notification->toArray());

        $this->delete(route('notifications.destroy', $notification->id))
            ->assertStatus(403);

        $this->assertDatabaseHas('notifications', $notification->toArray());
    }

    /** @test */
    public function mails_are_send_if_requested(): void
    {
        $this->signInAdmin();
        create(User::class);

        $notification = [
            'title' => "Test Title",
            'message' => "Test Message",
            'is_active' => true,
            'send_mail' => true,
        ];

        $this->post(route('notifications.store'), $notification)
            ->assertSuccessful();

        Mail::assertQueued(NotificationMail::class, 2);
    }

    /** @test */
    public function mails_are_not_send_if_not_requested(): void
    {
        $this->signInAdmin();
        create(User::class);

        $notification = [
            'title' => "Test Title",
            'message' => "Test Message",
            'is_active' => true,
            'send_mail' => false,
        ];

        $this->post(route('notifications.store'), $notification)
            ->assertSuccessful();

        Mail::assertNotQueued(NotificationMail::class);
    }

    /** @test */
    public function mails_are_not_send_if_requested_but_not_published(): void
    {
        $this->signInAdmin();
        create(User::class);

        $notification = [
            'title' => "Test Title",
            'message' => "Test Message",
            'is_active' => false,
            'send_mail' => true,
        ];

        $this->post(route('notifications.store'), $notification)
            ->assertSuccessful();

        Mail::assertNotQueued(NotificationMail::class);
    }

    protected function setUp(): void
    {
        parent::setUp();

        Mail::fake();
        Event::fake([
            NotificationMail::class,
        ]);
    }
}
