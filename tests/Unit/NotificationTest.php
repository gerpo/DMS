<?php

namespace Tests\Unit;

use App\User;
use Tests\TestCase;
use App\Notification;

class NotificationTest extends TestCase
{
    /** @test */
    public function publish_at_timestamp_is_set_when_notification_is_active(): void
    {
        $notification = [
            'title' => 'Test Title',
            'message' => 'Test Message',
            'is_active' => true,
        ];

        $user = create(User::class);
        $user->notifications()->save(Notification::make($notification));

        $this->assertDatabaseHas('notifications', $notification);

        $savedNotification = Notification::where('title', 'Test Title')->first();
        $this->assertNotNull($savedNotification->published_at);
    }

    /** @test */
    public function publish_at_timestamp_is_not_set_when_notification_is_not_active(): void
    {
        $notification = [
            'title' => 'Test Title',
            'message' => 'Test Message',
            'is_active' => false,
        ];

        $user = create(User::class);
        $user->notifications()->save(Notification::make($notification));

        $this->assertDatabaseHas('notifications', $notification);

        $savedNotification = Notification::where('title', 'Test Title')->first();
        $this->assertNull($savedNotification->published_at);
    }

    /** @test */
    public function notification_has_a_creator(): void
    {
        $notification = [
            'title' => 'Test Title',
            'message' => 'Test Message',
            'is_active' => false,
        ];

        $user = create(User::class);
        $user->notifications()->save(Notification::make($notification));

        $savedNotification = Notification::where('title', 'Test Title')->first();
        $this->assertNotNull($savedNotification->creator);
    }

    /** @test */
    public function notification_can_be_published(): void
    {
        $notification = [
            'title' => 'Test Title',
            'message' => 'Test Message',
            'is_active' => false,
        ];

        $user = create(User::class);
        $user->notifications()->save(Notification::make($notification));
        $savedNotification = Notification::where('title', 'Test Title')->first();

        $this->assertFalse($savedNotification->is_active);

        $savedNotification->publish();

        $this->assertTrue($savedNotification->is_active);
    }
}
