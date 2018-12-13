@extends('layouts.app')

@section('content')
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">@langTitleChoice('user.user')</li>
            </ol>
        </nav>
        <user-component :house-names="{{ json_encode(config('dms.dorms')) }}"></user-component>
    </div>
@endsection
