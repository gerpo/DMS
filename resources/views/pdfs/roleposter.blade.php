@extends('layouts.pdf')

@section('content')
    <h1>Role List</h1>

    <div class="column-page">

        @foreach($roles as $role)
            <div class="">
                <h2>{{ $role->name }}</h2>
                <ul class="">
                    @foreach($role->users as $user)
                        <li>{{ $user->full_name }}</li>
                    @endforeach
                </ul>
            </div>
        @endforeach

    </div>
@endsection