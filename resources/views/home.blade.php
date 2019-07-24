@extends('layouts.app')

@section('content')
    <div class="container">
        <show-notifications-component :notifications="{{ $notifications }}"></show-notifications-component>
        <div class="d-flex flex-wrap">
            @foreach($packages as $package)
                @can($package->needed_permission)
                    <div class="card m-3" style="width: 13rem;">
                        <a href="{{ url($package->route) }}" title="{{ $package->description }}" class="h-100">
                            <div class="card-body d-flex flex-column justify-content-between h-100">
                                @if (file_exists(public_path('images/icons/'.$package->name.'.svg')))
                                    <img class="card-img"
                                         src="{{ secure_asset('images/icons/'.$package->name.'.svg') }}"
                                         alt="{{ $package->name }}">
                                @else
                                    <img class="card-img" src="{{ secure_asset('images/icons/default.png') }}"
                                         alt="{{ $package->name }}">
                                @endif

                                <h5 class="card-title text-center mt-2 text-dark text-capitalize align-bottom">{{ $package->name }}</h5>
                            </div>
                        </a>
                    </div>
                @endcan
            @endforeach
        </div>
    </div>
@endsection