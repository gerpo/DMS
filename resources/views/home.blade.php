@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="d-flex flex-wrap">
            @foreach($packages as $package)
                @can($package->needed_permission)
                    <a href="{{ url($package->route) }}" title="{{ $package->description }}">
                        <div class="card m-3">
                            <div class="card-body">
                                @if (file_exists(public_path('images/icons/'.$package->name.'.svg')))
                                    <img class="card-img"
                                         src="{{ secure_asset('images/icons/'.$package->name.'.svg') }}">
                                @else
                                    <img class="card-img" src="{{ secure_asset('images/icons/default.png') }}">
                                @endif

                                <p class="card-text text-center mt-2 text-dark text-capitalize">{{ $package->name }}</p>
                            </div>
                        </div>
                    </a>
                @endcan
            @endforeach
        </div>
    </div>
@endsection
