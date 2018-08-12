<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Storage;

class RegularMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    protected $mailData;

    /**
     * Create a new message instance.
     *
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
        $this->from($this->mailData['sender'].'@'.$_SERVER['HTTP_HOST'])
            ->subject($this->mailData['subject'])
            ->markdown('emails.regular')
            ->with('content', $this->mailData['content']);

        foreach ($this->mailData['attachmentPaths'] as $attachment) {
            if (Storage::has($attachment)) {
                $this->attachFromStorage($attachment);
            }
        }

        return $this;
    }
}
