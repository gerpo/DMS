<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <style>
        body {
            font-family: 'sans-serif';
            width: 21cm;
            height: 29.7cm;
        }
        .column-page {
            column-count: 3;
            column-rule: 1px solid #6f42c1;
        }
    </style>
</head>
<body>
    @yield('content')
</body>
</html>