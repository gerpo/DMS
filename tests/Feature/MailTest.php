<?php

namespace Tests\Feature;

use App\Mail\RegularMail;
use App\User;
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
            'recipients' => ['test@dms.com']
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
    public function an_unauthorized_user_cannot_send_any_mails(): void
    {
        $this->withExceptionHandling()->signIn();

        $this->post(route('mails.store'), ['toAll' => true])
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
    public function single_addresses_are_required_if_mail_should_not_be_sent_to_all(): void
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
    public function mails_are_only_send_to_user_addresses(): void
    {
        $this->signInAdmin();

        $user1 = create(User::class);

        $this->post(route('mails.store'), $this->validParams(['recipients' => [$user1->email, 'random@email.com']]))
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, function ($mail) use ($user1) {
            return $mail->hasTo($user1->email) &&
                !$mail->hasTo('random@email.com');
        });
    }

    protected function setUp(): void
    {
        parent::setUp();

        Mail::fake();
    }
}
