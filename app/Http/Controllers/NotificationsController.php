<?php

namespace App\Http\Controllers;

use App\User;
use App\Notification;
use Illuminate\Http\Request;
use App\Jobs\SendNotificationMail;

class NotificationsController extends Controller
{
    public function index()
    {
        $notifications = Notification::with('creator')->get();

        return view('notifications')->with(compact('notifications'));
    }

    public function store(Request $request)
    {
        $sendMail = $request['send_mail'] ?? false;
        $data = $request->validate([
            'title' => 'string|nullable',
            'message' => 'required|string',
            'is_active' => 'boolean',
        ]);
        $notification = Notification::make($data);
        $request->user()->notifications()->save($notification);

        if ($sendMail && $data['is_active']) {
            $this->sendMailToAll($data['title'], $data['message']);
        }

        return $notification->load('creator');
    }

    private function sendMailToAll($subject, $message): void
    {
        $mailData = [
            'recipients' => User::all(),
            'subject' => $subject,
            'content' => $message,
        ];

        dispatch(new SendNotificationMail($mailData));
    }

    public function update(Notification $notification)
    {
        $data = request()->validate([
            'is_active' => 'required|boolean',
        ]);

        $notification->publish($data['is_active']);

        return $notification->fresh();
    }

    public function destroy(Notification $notification): void
    {
        $notification->delete();
    }
}
