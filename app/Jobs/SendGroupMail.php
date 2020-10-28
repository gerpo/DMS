<?php

namespace App\Jobs;

use App\Mail\RegularMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Mail;

class SendGroupMail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $mailData;

    /**
     * Create a new job instance.
     *
     * @param $mailData
     */
    public function __construct($mailData)
    {
        $this->mailData = $mailData;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(): void
    {
        $recipient = $this->mailData['recipients']->pop();

        if ($recipient === null) {
            return;
        }

        Mail::to($recipient)->send(new RegularMail($this->mailData));
        self::dispatch($this->mailData);
    }
}
