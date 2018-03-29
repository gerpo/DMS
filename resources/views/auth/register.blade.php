@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Register</div>

                    <div class="card-body">
                        <form method="POST" action="{{ route('register') }}">
                            @csrf

                            <div class="form-group row">

                                <div class="col-10 offset-1">
                                    <input id="firstname" type="text" placeholder="@langTitle('general.firstname')"
                                           class="form-control{{ $errors->has('firstname') ? ' is-invalid' : '' }}"
                                           name="firstname" value="{{ old('firstname') }}" required autofocus>

                                    @if ($errors->has('firstname'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('firstname') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row">

                                <div class="col-10 offset-1">
                                    <input id="lastname" type="text" placeholder="@langTitle('general.lastname')"
                                           class="form-control{{ $errors->has('lastname') ? ' is-invalid' : '' }}"
                                           name="lastname" value="{{ old('lastname') }}" required autofocus>

                                    @if ($errors->has('lastname'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('lastname') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row">

                                <div class="col-md-2 offset-1">
                                    <input id="floor" type="number" min="0" max="15" size="2"
                                           placeholder="@langTitle('general.floor')"
                                           class="form-control{{ $errors->has('floor') ? ' is-invalid' : '' }}"
                                           name="floor" value="{{ old('floor') }}" required autofocus>

                                    @if ($errors->has('floor'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('floor') }}</strong>
                                    </span>
                                    @endif
                                </div>

                                <div class="col-md-2">
                                    <input id="room" type="number" min="1" max="16" size="2"
                                           placeholder="@langTitle('general.room')"
                                           class="form-control{{ $errors->has('room') ? ' is-invalid' : '' }}"
                                           name="room" value="{{ old('room') }}" required autofocus>

                                    @if ($errors->has('room'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('room') }}</strong>
                                    </span>
                                    @endif
                                </div>

                                <div class="col-md-6">
                                    <select id="house"
                                            class="form-control{{ $errors->has('house') ? ' is-invalid' : '' }}"
                                            name="house" required autofocus>
                                        @foreach(config('dms.dorms') as $dorm)
                                            <option value="$dorm" {{ old('house') ? ' selected' : '' }}>{{ $dorm }}</option>
                                        @endforeach
                                    </select>

                                    @if ($errors->has('house'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('house') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row">

                                <div class="col-10 offset-1">
                                    <input id="username" type="text" placeholder="@langTitle('general.username')"
                                           class="form-control{{ $errors->has('username') ? ' is-invalid' : '' }}"
                                           name="username" value="{{ old('username') }}" required autofocus>

                                    @if ($errors->has('username'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('username') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row">

                                <div class="col-10 offset-1">
                                    <input id="email" type="email" placeholder="@langTitle('general.email')"
                                           class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"
                                           name="email" value="{{ old('email') }}" required>

                                    @if ($errors->has('email'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row">

                                <div class="col-10 offset-1">
                                    <input id="password" type="password" placeholder="@langTitle('general.password')"
                                           class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}"
                                           name="password" required>

                                    @if ($errors->has('password'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row">

                                <div class="col-10 offset-1">
                                    <input id="password-confirm" type="password"
                                           placeholder="@langTitle('general.password_confirm')"
                                           class="form-control" name="password_confirmation" required>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-6 offset-3">
                                    <button type="submit" class="btn btn-primary btn-block">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
