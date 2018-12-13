@extends('layouts.app')

@section('content')
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="{{ route('home') }}">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">@langTitleChoice('general.plugin')</li>
            </ol>
        </nav>
        <plugins-component :plugins="{{ $plugins }}"></plugins-component>
    </div>
@endsection