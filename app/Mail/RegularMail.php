<?php

namespace App\Mail;

use Storage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RegularMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    protected $mailData;

    /**
     * Create a new message instance.
     */
    public function __construct($mailData)
    {
        $this->mailData = $mailData;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): self
    {
        $this->from($this->mailData['sender'].'@'.env('MAIL_DOMAIN'))
            ->subject($this->mailData['subject'])
            ->markdown('emails.regular')
            ->with('content', $this->mailData['content']);

        foreach ($this->mailData['attachmentPaths'] as $attachment) {
            if (! Storage::has($attachment)) {
                continue;
            }

            $this->attachFromStorage($attachment);
        }

        return $this;
    }
}
