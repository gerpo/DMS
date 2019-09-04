<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
@yield('styles')

<!-- Named routes for js -->
    @routes

    <!-- User information -->
    @if(Auth::check())
        <script>
            window.dms = {!! json_encode([
            'user_id' => Auth::user()->id,
            'roles' => Auth::user()->roles->load('abilities')->mapWithKeys(function($role) { return [$role->name => $role->abilities->pluck('name')];}),
            'permissions' => Auth::user()->getAbilities()->pluck('name'),
            'user' => Auth::user()->only(['firstname', 'lastname', 'email', 'floor', 'room'])
        ]) !!}
        </script>
    @endif

</head>
<body>
<div id="app">
    <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
        <div class="container">
            @if(Auth::check())
                <a class="navbar-brand" href="{{ route('home') }}">
                    {{ config('app.name', 'DMS') }}
                </a>
            @else
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'DMS') }}
                </a>
            @endif
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">

                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <!-- Authentication Links -->
                    @guest
                        <li><a class="nav-link" href="{{ route('login') }}">Login</a></li>
                        <li><a class="nav-link" href="{{ route('register') }}">{{ __('general.register') }}</a></li>
                    @else
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false">
                                {{ Auth::user()->username }} <span class="caret"></span>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a href="{{ route('home') }}"
                                   class="dropdown-item text-capitalize">{{ __('general.home') }}</a>

                                <a class="dropdown-item" href="{{ route('logout') }}"
                                   onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                    Logout
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                      style="display: none;">
                                    @csrf
                                </form>
                            </div>
                        </li>
                    @endguest
                </ul>
            </div>
        </div>
    </nav>

    <main class="py-4">
        <notifications classes="alert-wrapper" width="100%" :max="2"></notifications>
        @yield('content')
    </main>
    <portal-target name="modals"></portal-target>
</div>

<!-- Scripts -->
@yield('scripts')
{{--<script src="{{ asset('js/manifest.js') }}"></script>
<script src="{{ asset('js/vendor.js') }}"></script>--}}
<script src="{{ asset('js/app.js') }}"></script>
<script>
    // Navbar and dropdowns
    let toggle = document.getElementsByClassName('navbar-toggler')[0],
        collapse = document.getElementsByClassName('navbar-collapse')[0],
        dropdowns = document.getElementsByClassName('dropdown');

    // Toggle if navbar menu is open or closed
    function toggleMenu() {
        collapse.classList.toggle('collapse');
        collapse.classList.toggle('in');
    }

    // Close all dropdown menus
    function closeMenus() {
        for (let j = 0; j < dropdowns.length; j++) {
            dropdowns[j].getElementsByClassName('dropdown-menu')[0].classList.remove('show');
            dropdowns[j].classList.remove('show');
        }
    }

    // Add click handling to dropdowns
    for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].addEventListener('click', function() {
                const open = this.classList.contains('show');
                closeMenus();
                if (!open) {
                    this.getElementsByClassName('dropdown-menu')[0].classList.toggle('show');
                    this.classList.toggle('show');
                }
        });
    }

    // Close dropdowns when screen becomes big enough to switch to open by hover
    function closeMenusOnResize() {
        if (document.body.clientWidth >= 768) {
            closeMenus();
            collapse.classList.add('collapse');
            collapse.classList.remove('in');
        }
    }

    // Event listeners
    window.addEventListener('resize', closeMenusOnResize, false);
    toggle.addEventListener('click', toggleMenu, false);
</script>
</body>
</html>
