<?php

namespace Tests\Feature;

use App\Mail\ConfirmEmailMail;
use App\User;
use Mail;
use Tests\TestCase;

class VerifyTest extends TestCase
{
    /** @test */
    public function verify_page_is_returned_when_unconfirmed_user_tries_to_enter(): void
    {
        $user = create(User::class, ['confirmed' => false]);

        $this->signIn($user);

        $this->get(route('home'))
            ->assertRedirect(route('verify.index'));
    }

    /** @test */
    public function confirmed_user_is_redirect_to_home_when_tries_to_hit_verify_route(): void
    {
        $user = create(User::class);

        $this->signIn($user);

        $this->get(route('verify.index'))
            ->assertRedirect(route('home'));
    }

    /** @test */
    public function user_is_redirected_to_base_route_after_resend_hit(): void
    {
        $user = create(User::class, ['confirmed' => false]);

        $this->signIn($user);

        $this->get(route('verify.resend'))
            ->assertRedirect('/');
    }

    /** @test */
    public function confirmation_email_is_send_after_user_request(): void
    {
        $user = create(User::class, ['confirmed' => false]);

        $this->signIn($user);

        $this->get(route('verify.resend'));

        Mail::assertQueued(ConfirmEmailMail::class);
    }

    protected function setUp(): void
    {
        parent::setUp();

        Mail::fake();
    }
}
