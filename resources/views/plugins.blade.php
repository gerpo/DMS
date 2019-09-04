@extends('layouts.app')

@section('content')
    <div class="container">
        <plugins-component :plugins="{{ $plugins }}"></plugins-component>
    </div>
@endsection