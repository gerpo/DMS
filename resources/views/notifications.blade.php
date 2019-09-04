@extends('layouts.app')

@section('content')
    <div class="container">
        <notification-component :active-notifications="{{ $notifications }}"></notification-component>
    </div>
@endsection