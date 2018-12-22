let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .options({
        processCssUrls: false
    })
    .extract();

mix.browserSync({
    proxy: 'https://dms.test',
    https: true
});

const Visualizer = require('webpack-visualizer-plugin');
const WebPack = require('webpack');
mix.webpackConfig({
    plugins: [
        new WebPack.IgnorePlugin(/^\.\/locale$/, /(de|en)/),
        new Visualizer(),
    ]
});
