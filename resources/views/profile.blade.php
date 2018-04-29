@extends('layouts.app')

@section('content')
    <profile-component :user="{{ json_encode($user) }}" :house-names="{{ json_encode(config('dms.dorms')) }}"></profile-component>
@endsection
