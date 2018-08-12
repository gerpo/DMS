<?php

namespace App\Listeners;

use Illuminate\Support\Facades\Storage;
use Swift_Attachment;

class MailSentListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object $event
     * @return void
     */
    public function handle($event): void
    {
        $attachments = [];
        /** @var \Swift_Message $message */
        $message = $event->message;
        foreach ($message->getChildren() as $child) {
            if ($child instanceof Swift_Attachment) {
                $attachments[] = str_replace('attachment; filename=', null,
                    $child->getHeaders()->get('content-disposition')->getFieldBody());
            }
        }

        foreach ($attachments as $attachment) {
            $filename = 'attachments/'.$attachment;
            if (!Storage::has($filename)) {
                continue;
            }

            Storage::delete($filename);
        }


    }
}
