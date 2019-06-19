<?php

namespace App\Http\Controllers;

use Mail;
use App\Role;
use App\User;
use App\Mail\RegularMail;
use App\Jobs\SendGroupMail;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MailsController extends Controller
{
    public function index()
    {
        return view('mails');
    }

    public function store(Request $request): void
    {
        $user = $request->user();
        $mailData = $request->validate([
            'sender' => ['required', Rule::in($request->user()->roles()->pluck('name'))],
            'toAll' => 'boolean',
            'group' => ['string', 'nullable', 'regex:/^(floor_[0-9]+)|(role_[a-zA-Z0-9]+)$/'],
            'recipients' => [
                'array',
                'nullable',
                Rule::requiredIf(function () use ($request) {
                    return ! $request->get('toAll') && empty($request->get('group'));
                }),
            ],
            'recipients.*' => 'email',
            'ccRecipients' => 'array',
            'ccRecipients.*' => 'email|nullable',
            'bccRecipients' => 'array',
            'bccRecipients.*' => 'email',
            'subject' => 'string|nullable',
            'content' => 'string|nullable',
            'attachmentPaths' => 'array|nullable',
            'attachmentPaths.*' => 'string',
        ]);

        if ($request->get('toAll')) {
            $this->sendMailToAll($mailData, $user);
        } elseif ($request->get('group') !== '' && $request->get('group') !== null) {
            $this->sendMailToGroup($mailData, $user);
        } else {
            Mail::to($mailData['recipients'])
                ->cc($mailData['ccRecipients'] ?? [])
                ->bcc($mailData['bccRecipients'] ?? [])
                ->send(new RegularMail($mailData));
        }
    }

    private function sendMailToAll($mailData, $user): void
    {
        if ($user->cannot('send_mails')) {
            abort(403);
        }

        $recipients = User::all();

        $mailData['recipients'] = $recipients;

        $this->dispatch(new SendGroupMail($mailData));
        //foreach ($recipients as $recipient) {
         //   Mail::to($recipients)->send(new RegularMail($mailData));
        //}
    }

    private function sendMailToGroup($mailData, $user): void
    {
        [$type, $id] = explode('_', $mailData['group']);

        if ($user->cannot("send_{$type}Mails")) {
            abort(403);
        }

        $addresses = $this->getGroupAddresses($type, $id);

        foreach ($addresses as $address) {
            Mail::to($address)->cc($addresses->filter(function ($value) use ($address) {
                return $value !== $address;
            }))->send(new RegularMail($mailData));
        }
    }

    private function getGroupAddresses($type, $id)
    {
        switch ($type) {
            case 'floor':
                return User::select('email')
                    ->where('floor', $id)
                    ->get();
            case 'role':
                return Role::with('users')
                    ->where('name', $id)
                    ->get()
                    ->pluck('users')
                    ->map(function ($users) {
                        return $users->pluck('email');
                    })->flatten();
            default:
                return [];
        }
    }
}
