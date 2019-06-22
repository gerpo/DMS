let mix = require('laravel-mix');
require('laravel-mix-purgecss');

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
    .copyDirectory('resources/images', 'public/images')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .options({
        processCssUrls: false
    })
    .sourceMaps(false)
    .purgeCss();

mix.browserSync({
    proxy: 'https://tower.test',
    https: true
});

const WebPack = require('webpack');
mix.webpackConfig({
    plugins: [
        new WebPack.IgnorePlugin(/^\.\/locale$/, /(de|en)/),
    ],
    resolve: {
        alias: {
            '@': __dirname + '/resources/assets/js'
        }
    },
    output: {
        chunkFilename: 'js/[name].js',
    },
});
