<?php

namespace App\Listeners;

use App\Events\UserEmailChanged;
use App\Mail\ConfirmEmailMail;
use Mail;

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
