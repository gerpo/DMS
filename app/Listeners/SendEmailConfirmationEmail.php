<?php

namespace App\Listeners;

use Mail;
use App\Mail\ConfirmEmailMail;
use App\Events\UserEmailChanged;

class SendEmailConfirmationEmail
{
    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(UserEmailChanged $event)
    {
        Mail::to($event->user)->send(new ConfirmEmailMail($event->user));
    }
}
