@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="card alert-warning">
            <div class="card-header text-capitalize">Account not verified</div>
            <div class="card-body">
                <p>
                    Your have <strong>not confirmed</strong> your email address, yet.
                </p>
                <p>
                    Please click on the link provided in the confirmation email. We have sent the mail to
                    <strong>{{ Auth::user()->email }}</strong>.<br>
                    If you have not received the email (check spam folder) click on the link below to resend it.
                </p>
                <div class="text-center">
                    <a href="{{ route('verify.resend') }}">Please resend.</a>
                </div>
            </div>
        </div>
    </div>
@endsection
