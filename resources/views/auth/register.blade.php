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
                                    <input id="firstname" type="text" v-validate="'required|alpha_spaces'"
                                           placeholder="@langTitle('general.firstname')" name="firstname"
                                           class="form-control{{ $errors->has('firstname') ? ' is-invalid' : '' }}"
                                           :class="{'is-invalid': validationErrors.has('firstname')}"
                                           data-toggle="tooltip"
                                           :data-original-title="validationErrors.first('firstname')"
                                           value="{{ old('firstname') }}" required autofocus>

                                    @if ($errors->has('firstname'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('firstname') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row">

                                <div class="col-10 offset-1">
                                    <input id="lastname" type="text" v-validate="'required|alpha_spaces'"
                                           placeholder="@langTitle('general.lastname')" name="lastname"
                                           class="form-control{{ $errors->has('lastname') ? ' is-invalid' : '' }}"
                                           :class="{'is-invalid': validationErrors.has('lastname')}"
                                           data-toggle="tooltip"
                                           :data-original-title="validationErrors.first('lastname')"
                                           value="{{ old('lastname') }}" required autofocus>

                                    @if ($errors->has('lastname'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('lastname') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row">

                                <div class="col-md-2 offset-1">
                                    <input id="floor" type="number" min="0" max="{{ config('dms.max_floor') }}" size="2"
                                           v-validate="'required|min_value:0|max_value:{{ config('dms.max_floor') }}'"
                                           placeholder="@langTitle('general.floor')" name="floor"
                                           class="form-control{{ $errors->has('floor') ? ' is-invalid' : '' }}"
                                           :class="{'is-invalid': validationErrors.has('floor')}"
                                           data-toggle="tooltip" :data-original-title="validationErrors.first('floor')"
                                           value="{{ old('floor') }}" required autofocus>

                                    @if ($errors->has('floor'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('floor') }}</strong>
                                    </span>
                                    @endif
                                </div>

                                <div class="col-md-2">
                                    <input id="room" type="number" min="1" max="{{ config('dms.max_room') }}" size="2"
                                           v-validate="'required|min_value:0|max_value:{{ config('dms.max_room') }}'"
                                           placeholder="@langTitle('general.room')" name="room"
                                           class="form-control{{ $errors->has('room') ? ' is-invalid' : '' }}"
                                           :class="{'is-invalid': validationErrors.has('room')}"
                                           data-toggle="tooltip" :data-original-title="validationErrors.first('room')"
                                           value="{{ old('room') }}" required autofocus>

                                    @if ($errors->has('room'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('room') }}</strong>
                                    </span>
                                    @endif
                                </div>

                                <div class="col-md-6">
                                    <select id="house" v-validate="'required'"
                                            class="form-control{{ $errors->has('house') ? ' is-invalid' : '' }}"
                                            data-toggle="tooltip" :data-original-title="validationErrors.first('house')"
                                            name="house" required autofocus>
                                        @foreach(config('dms.dorms') as $dorm)
                                            <option value="{{ $dorm }}" {{ $dorm == old('house') ? ' selected' : '' }}>{{ $dorm }}</option>
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
                                    <input id="username" type="text" v-validate="'required|alpha_num'"
                                           placeholder="@langTitle('general.username')" name="username"
                                           class="form-control{{ $errors->has('username') ? ' is-invalid' : '' }}"
                                           :class="{'is-invalid': validationErrors.has('username')}"
                                           data-toggle="tooltip"
                                           :data-original-title="validationErrors.first('username')"
                                           value="{{ old('username') }}" required autofocus>

                                    @if ($errors->has('username'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('username') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row">

                                <div class="col-10 offset-1">
                                    <input id="email" type="email" v-validate="'required|email'"
                                           placeholder="@langTitle('general.email')" name="email"
                                           class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"
                                           :class="{'is-invalid': validationErrors.has('email')}"
                                           data-toggle="tooltip" :data-original-title="validationErrors.first('email')"
                                           value="{{ old('email') }}" required>

                                    @if ($errors->has('email'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row">

                                <div class="col-10 offset-1">
                                    <input id="password" type="password"
                                           v-validate="'required|confirmed:password_confirmation'"
                                           placeholder="@langTitle('general.password')" name="password"
                                           class="form-control"
                                           :class="{'is-invalid': validationErrors.has('password')}"
                                           data-toggle="tooltip"
                                           :data-original-title="validationErrors.first('password')"
                                           required>

                                    @if ($errors->has('password'))
                                        <span class="invalid-feedback">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row">

                                <div class="col-10 offset-1">
                                    <input id="password-confirm" type="password" ref="password_confirmation"
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
