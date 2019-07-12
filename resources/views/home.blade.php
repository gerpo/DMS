@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="notification_container alert alert-warning alert-dismissible fade show p-2 mx-3">
            <p class="lead alert-heading">Well done!</p>
            <p>Test nachricht an alle benutzer der Plattform.</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="d-flex flex-wrap">
            @foreach($packages as $package)
                @can($package->needed_permission)
                    <div class="card m-3" style="width: 13rem;">
                        <a href="{{ url($package->route) }}" title="{{ $package->description }}" class="h-100">
                            <div class="card-body d-flex flex-column justify-content-between h-100">
                                @if (file_exists(public_path('images/icons/'.$package->name.'.svg')))
                                    <img class="card-img"
                                         src="{{ secure_asset('images/icons/'.$package->name.'.svg') }}" alt="{{ $package->name }}">
                                @else
                                    <img class="card-img" src="{{ secure_asset('images/icons/default.png') }}" alt="{{ $package->name }}">
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
