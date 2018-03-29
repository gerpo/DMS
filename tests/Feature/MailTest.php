<?php

namespace Tests\Feature;

use App\Mail\RegularMail;
use App\User;
use Mail;
use Tests\TestCase;

class MailTest extends TestCase
{
    /** @test */
    public function an_admin_can_write_an_mail_to_all_residents()
    {
        $this->signInAdmin();

        create(User::class, [], 5);

        $this->post(route('mails.store'), ['toAll' => true])
            ->assertSuccessful();

        User::all()->each(function ($user) {
            Mail::assertQueued(RegularMail::class, function ($mail) use ($user) {
                return $mail->hasTo($user->email);
            });
        });
    }

    /** @test */
    public function an_admin_can_write_an_mail_to_specific_residents()
    {
        $this->signInAdmin();

        $user1 = create(User::class);
        $user2 = create(User::class);

        $this->post(route('mails.store'), ['to' => [$user1->email]])
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, function ($mail) use ($user1, $user2) {
            return $mail->hasTo($user1->email) &&
                !$mail->hasTo($user2->email);
        });
    }

    /** @test */
    public function an_authorized_user_can_send_a_mail_to_all_residents()
    {
        $user = create(User::class);
        $user->allow('send_mails');

        $this->signIn($user);

        create(User::class, [], 5);

        $this->post(route('mails.store'), ['toAll' => true])
            ->assertSuccessful();

        User::all()->each(function ($user) {
            Mail::assertQueued(RegularMail::class, function ($mail) use ($user) {
                return $mail->hasTo($user->email);
            });
        });
    }

    /** @test */
    public function an_unauthorized_user_can_send_a_mail_to_specific_residents()
    {
        $user = create(User::class);
        $user->allow('send_mails');

        $this->signIn($user);

        $user1 = create(User::class);
        $user2 = create(User::class);

        $this->post(route('mails.store'), ['to' => [$user1->email]])
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, function ($mail) use ($user1, $user2) {
            return $mail->hasTo($user1->email) &&
                !$mail->hasTo($user2->email);
        });
    }

    /** @test */
    public function an_unauthorized_user_cannot_send_any_mails()
    {
        $this->withExceptionHandling()->signIn();

        $this->post(route('mails.store'), ['toAll' => true])
            ->assertStatus(403);

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function recipient_is_required()
    {
        $this->withExceptionHandling()->signInAdmin();

        $this->post(route('mails.store'))
            ->assertSessionHasErrors(['to']);

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function single_adresses_are_not_required_if_mail_should_be_sent_to_all()
    {
        $this->withExceptionHandling()->signInAdmin();

        $this->post(route('mails.store'), ['toAll' => true])
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class);
    }

    /** @test */
    public function single_adresses_are_required_if_mail_should_not_be_sent_to_all()
    {
        $this->withExceptionHandling()->signInAdmin();

        $this->post(route('mails.store'), ['toAll' => false])
            ->assertSessionHasErrors(['to']);

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function provided_recipients_must_be_valid_emails()
    {
        $this->withExceptionHandling()->signInAdmin();

        $this->post(route('mails.store'), ['to' => ['not a email']])
            ->assertSessionHasErrors(['to.*']);

        Mail::assertNotQueued(RegularMail::class);
    }

    /** @test */
    public function mails_are_only_send_to_user_addresses()
    {
        $this->signInAdmin();

        $user1 = create(User::class);

        $this->post(route('mails.store'), ['to' => [$user1->email, 'random@email.com']])
            ->assertSuccessful();

        Mail::assertQueued(RegularMail::class, function ($mail) use ($user1) {
            return $mail->hasTo($user1->email) &&
                !$mail->hasTo('random@email.com');
        });
    }

    protected function setUp()
    {
        parent::setUp();

        Mail::fake();
    }
}
