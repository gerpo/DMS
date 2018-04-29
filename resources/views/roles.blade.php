@extends('layouts.app')

@section('content')
    <roles-component :roles="{{ $roles }}" :abilities="{{ $abilities }}"></roles-component>
@endsection
