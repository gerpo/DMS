@extends('layouts.app')

@section('content')
    <div class="container">
        <user-component :users-data="{{ $users }}" :house-names="{{ json_encode(config('dms.dorms')) }}"></user-component>
    </div>
@endsection
