@extends('layouts.app')

@section('content')
    <div class="container">
        <roles-component :roles="{{ $roles }}" :abilities="{{ $abilities }}"></roles-component>
    </div>
@endsection
