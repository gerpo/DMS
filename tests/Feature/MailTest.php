<?php

namespace Tests\Feature;

use App\Mail\RegularMail;
use App\User;
use Bus;
use Event;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Mail;
use Tests\TestCase;

class MailTest extends TestCase
{
    /** @test */
    public function mail_route_returns_mail_view(): void
    {
        $this->signInAdmin();

        $this->get(route('mails'))
            ->assertSuccessful()
            ->assertViewIs('mails');
    }

    /** @test */
    public function an_admin_can_write_an_mail_to_all_residents(): void
    {
        $this->signInAdmin();

        create(User::class, [], 5);

        $this->post(route('mails.store'), $this->validParams(['toAll' => true]))
            ->assertSuccessful();

        User::all()->each(function ($user) {
            Mail::assertQueued(RegularMail::class, function ($mail) use ($user) {
                return $mail->hasTo($user->email);
            });
        });
    }

    private function validParams($overwrites = [])
    {
        return array_merge([
            'sender' => 'admin',
            'recipients' => ['test@dms.com'],
            'subject' => '',
            'content' => '',
            'attachmentPaths' => []
        ], $overwrites);
    }

    /** @test */
    public function an_admin_can_write_an_mail_to_specific_residents(): void
    {
        $this->signInAdmin();

        $user1 = create(User::class);
        $user2 = create(User::class);

        $this->post(route('mails.store'), $this->validParams(['recipients' => [$user1->email]]))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, function ($mail) use ($user1, $user2) {
            return $mail->hasTo($user1->email) &&
                !$mail->hasTo($user2->email);
        });
    }

    /** @test */
    public function an_admin_can_send_mails_to_floor_group(): void
    {
        $this->signInAdmin(create(User::class, ['floor' => 1]));

        create(User::class, ['floor' => 2], 2);

        $this->post(route('mails.store'), $this->validParams(['group' => 'floor_2']))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, 2);
    }

    /** @test */
    public function an_admin_can_send_mails_to_role_group(): void
    {
        $this->signInAdmin();

        create(User::class)->assign('recipient');
        create(User::class)->assign('recipient');

        $this->post(route('mails.store'), $this->validParams(['group' => 'role_recipient']))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, 2);
    }

    /** @test */
    public function an_authorized_user_can_send_a_mail_to_all_residents(): void
    {
        $user = create(User::class);
        $user->allow('send_mails');
        $user->assign('testing-role');

        $this->signIn($user);

        create(User::class, [], 5);

        $this->post(route('mails.store'), $this->validParams(['sender' => 'testing-role', 'toAll' => true]))
            ->assertSuccessful();

        User::all()->each(function ($user) {
            Mail::assertQueued(RegularMail::class, function ($mail) use ($user) {
                return $mail->hasTo($user->email);
            });
        });
    }

    /** @test */
    public function an_authorized_user_can_send_a_mail_to_specific_residents(): void
    {
        $user = create(User::class);
        $user->allow('send_mails');
        $user->assign('testing-role');

        $this->signIn($user);

        $user1 = create(User::class);
        $user2 = create(User::class);

        $this->post(route('mails.store'),
            $this->validParams(['sender' => 'testing-role', 'recipients' => [$user1->email]]))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, function ($mail) use ($user1, $user2) {
            return $mail->hasTo($user1->email) &&
                !$mail->hasTo($user2->email);
        });
    }

    /** @test */
    public function an_authorized_user_can_send_mails_to_floor_group(): void
    {
        $user = create(User::class, ['floor' => 1]);
        $user->allow('send_floorMails');
        $user->assign('testing-role');
        $this->signIn($user);

        create(User::class, ['floor' => 2], 2);

        $this->post(route('mails.store'), $this->validParams(['sender' => 'testing-role', 'group' => 'floor_2']))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, 2);
    }

    /** @test */
    public function an_authorized_user_can_send_mails_to_role_group(): void
    {
        $user = create(User::class);
        $user->allow('send_roleMails');
        $user->assign('testing-role');
        $this->withExceptionHandling()->signIn($user);

        create(User::class)->assign('recipient');
        create(User::class)->assign('recipient');

        $this->post(route('mails.store'), $this->validParams(['sender' => 'testing-role', 'group' => 'role_recipient']))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, 2);
    }

    /** @test */
    public function an_unauthorized_user_cannot_send_any_mails(): void
    {
        $this->withExceptionHandling()->signIn();

        $this->post(route('mails.store'), ['toAll' => true])
            ->assertStatus(403);

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function an_unauthorized_user_cannot_send_any_floor_mails(): void
    {
        $user = create(User::class, ['floor' => 1])
            ->allow('send_roleMails')
            ->assign('sender');
        $this->withExceptionHandling()->signIn($user);

        $this->post(route('mails.store'), ['sender' => 'sender', 'group' => 'floor_1'])
            ->assertStatus(403);

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function an_unauthorized_user_cannot_send_any_role_mails(): void
    {
        $user = create(User::class, ['floor' => 1])
            ->allow('send_floorMails')
            ->assign('sender');
        $this->withExceptionHandling()->signIn($user);

        create(User::class)->assign('recipient');
        create(User::class)->assign('recipient');

        $this->post(route('mails.store'), ['sender' => 'sender', 'group' => 'role_recipient'])
            ->assertStatus(403);

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function an_unauthorized_user_cannot_send_mails_to_all(): void
    {
        $user = create(User::class)
            ->allow('send_floorMails')
            ->assign('sender');
        $this->withExceptionHandling()->signIn($user);

        create(User::class, [], 2);

        $this->post(route('mails.store'), ['sender' => 'sender', 'toAll' => true])
            ->assertStatus(403);

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function sender_role_is_required(): void
    {
        $this->withExceptionHandling()->signInAdmin();

        $this->post(route('mails.store'), $this->validParams(['sender' => '']))
            ->assertSessionHasErrors(['sender']);

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function sender_must_be_an_assigned_role(): void
    {
        $user = create(User::class);
        $user->allow('send_mails');
        $this->withExceptionHandling()->signIn($user);

        // Logged in as normal user, so admin is not assigned.
        $this->post(route('mails.store'), $this->validParams(['sender' => 'admin']))
            ->assertSessionHasErrors(['sender']);

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function recipient_is_required(): void
    {
        $this->withExceptionHandling()->signInAdmin();

        $this->post(route('mails.store'), $this->validParams(['recipients' => '']))
            ->assertSessionHasErrors(['recipients']);

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function single_addresses_are_not_required_if_mail_should_be_sent_to_all(): void
    {
        $this->withExceptionHandling()->signInAdmin();

        $this->post(route('mails.store'), $this->validParams(['toAll' => true]))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class);
    }

    /** @test */
    public function single_addresses_are_not_required_if_mail_should_be_sent_to_group(): void
    {
        $this->withExceptionHandling()->signInAdmin();

        $this->post(route('mails.store'), $this->validParams(['recipients' => null, 'group' => 'role_admin']))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class);
    }

    /** @test */
    public function single_addresses_are_required_if_mail_should_not_be_sent_to_all_or_group(): void
    {
        $this->withExceptionHandling()->signInAdmin();

        $this->post(route('mails.store'), ['toAll' => false])
            ->assertSessionHasErrors(['recipients']);

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function provided_recipients_must_be_valid_emails(): void
    {
        $this->withExceptionHandling()->signInAdmin();

        $this->post(route('mails.store'), $this->validParams(['recipients' => ['not a email']]))
            ->assertSessionHasErrors(['recipients.*']);

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function provided_cc_recipients_must_be_valid_emails(): void
    {
        $this->withExceptionHandling()->signInAdmin();

        $this->post(route('mails.store'),
            $this->validParams(['recipients' => ['test@example.com'], 'ccRecipients' => ['invalid']]))
            ->assertSessionHasErrors(['ccRecipients.*']);

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function provided_bcc_recipients_must_be_valid_emails(): void
    {
        $this->withExceptionHandling()->signInAdmin();

        $this->post(route('mails.store'),
            $this->validParams(['recipients' => ['test@example.com'], 'bccRecipients' => ['invalid']]))
            ->assertSessionHasErrors(['bccRecipients.*']);

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function no_mail_send_with_invalid_group(): void
    {
        $this->withExceptionHandling()->signInAdmin(create(User::class, ['floor' => 1]));

        create(User::class, ['floor' => 2], 2);

        $this->post(route('mails.store'), $this->validParams(['group' => 'invalid_2']))
            ->assertSessionHasErrors('group');

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function mail_is_sent_to_cc_recipients(): void
    {
        $this->signInAdmin();

        $user1 = create(User::class);
        $user2 = create(User::class);

        $this->post(route('mails.store'),
            $this->validParams(['recipients' => [$user1->email], 'ccRecipients' => [$user2->email]]))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, function ($mail) use ($user1, $user2) {
            return $mail->hasTo($user1->email) &&
                $mail->hasCc($user2->email);
        });
    }

    /** @test */
    public function mail_is_sent_to_bcc_recipients(): void
    {
        $this->signInAdmin();

        $user1 = create(User::class);
        $user2 = create(User::class);

        $this->post(route('mails.store'),
            $this->validParams(['recipients' => [$user1->email], 'bccRecipients' => [$user2->email]]))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, function ($mail) use ($user1, $user2) {
            return $mail->hasTo($user1->email) &&
                $mail->hasBcc($user2->email);
        });
    }

    /** @test */
    public function mail_to_all_is_sent_to_users_separately(): void
    {
        $this->signInAdmin();

        $user1 = create(User::class);
        $user2 = create(User::class);

        $this->post(route('mails.store'), $this->validParams(['toAll' => true]))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, 3);

        Mail::assertQueued(RegularMail::class, function ($mail) use ($user1, $user2) {
            return $mail->hasTo($user1->email) &&
                !$mail->hasTo($user2->email);
        });
        Mail::assertQueued(RegularMail::class, function ($mail) use ($user1, $user2) {
            return $mail->hasTo($user2->email) &&
                !$mail->hasTo($user1->email);
        });
    }

    /** @test */
    public function group_mail_is_sent_to_users_separately(): void
    {
        $this->signInAdmin(create(User::class, ['floor' => 1]));

        $user1 = create(User::class, ['floor' => 2]);
        $user2 = create(User::class, ['floor' => 2]);

        $this->post(route('mails.store'), $this->validParams(['group' => 'floor_2']))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, 2);

        Mail::assertQueued(RegularMail::class, function ($mail) use ($user1, $user2) {
            return $mail->hasTo($user1->email) &&
                !$mail->hasTo($user2->email);
        });
        Mail::assertQueued(RegularMail::class, function ($mail) use ($user1, $user2) {
            return $mail->hasTo($user2->email) &&
                !$mail->hasTo($user1->email);
        });
    }

    /** @test */
    public function subject_is_set(): void
    {
        $this->signInAdmin();

        $this->post(route('mails.store'), $this->validParams(['subject' => 'Test Subject']))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, function ($mail) {
            $mail->build();
            return $mail->subject === 'Test Subject';
        });
    }

    /** @test */
    public function content_is_set(): void
    {
        $this->signInAdmin();

        $this->post(route('mails.store'), $this->validParams(['content' => 'Test Content']))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, function ($mail) {
            $mail->build();
            return $mail->viewData['content'] === 'Test Content';
        });
    }

    /** @test */
    public function attachments_are_attached_to_mail(): void
    {
        $path = Storage::put('attachments', UploadedFile::fake()->create('test.pdf', 1024));

        $this->signInAdmin();

        $this->post(route('mails.store'), $this->validParams([
            'attachmentPaths' => [$path]
        ]))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, function ($mail) {
            $mail = $mail->build();
            return count($mail->diskAttachments) === 1;
        });
    }

    /** @test */
    public function attachments_are_attached_to_all_mails(): void
    {
        $path = Storage::put('attachments', UploadedFile::fake()->create('test.pdf', 1024));
        $user = create(User::class);

        $this->signInAdmin($admin = create(User::class));

        $this->post(route('mails.store'), $this->validParams([
            'toAll' => true,
            'attachmentPaths' => [$path]
        ]))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, 2);

        Mail::assertQueued(RegularMail::class, function ($mail) use ($user) {
            $mail = $mail->build();
            return count($mail->diskAttachments) === 1 && $mail->hasTo($user->email);
        });

        Mail::assertQueued(RegularMail::class, function ($mail) use ($admin) {
            $mail = $mail->build();
            return count($mail->diskAttachments) === 2 && $mail->hasTo($admin->email);
        });
    }


    protected function setUp(): void
    {
        parent::setUp();

        Mail::fake();
        Storage::fake();
        Event::fake([
            RegularMail::class,
        ]);
    }
}
