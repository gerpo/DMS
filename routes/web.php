<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
Route::get('/register/confirm', 'Api\RegisterConfirmationController@index')->name('register.confirm');

Route::group(['middleware' => 'auth'], function () {
    Route::get('/home', 'HomeController@index')->name('home');

    Route::get('/users', 'UsersController@index')->name('users')->middleware('check_ability:manage_users');


    Route::get('/roles', 'RolesController@index')->name('roles');
    Route::post('/roles', 'RolesController@store')->name('roles.store')->middleware('check_ability:manage_roles');

    Route::get('/abilities', 'AbilitiesController@store')->name('abilities');
    Route::post('/abilities',
        'AbilitiesController@store')->name('abilities.store')->middleware('check_ability:manage_roles');

    Route::post('/roles/{role}/abilities',
        'RoleAbilitiesController@store')->name('role-abilities.store')->middleware('check_ability:manage_roles');
    Route::delete('/roles/{role}/abilities',
        'RoleAbilitiesController@destroy')->name('role-abilities.destroy')->middleware('check_ability:manage_roles');


    Route::post('/users/{user}/roles',
        'UserRolesController@store')->name('user-roles.store')->middleware('check_ability:manage_users');
    Route::delete('/users/{user}/roles',
        'UserRolesController@destroy')->name('user-roles.destroy')->middleware('check_ability:manage_users');


    Route::post('/mails', 'MailsController@store')->name('mails.store')->middleware('check_ability:send_mails');

    Route::get('/api/addresses',
        'Api\MailAddressesController@index')->name('api.mailAddresses')->middleware('check_ability:send_mails,send_roleMails,send_floorMails');
    Route::post('/api/addresses',
        'Api\MailAddressesController@query')->name('api.mailAddressesQuery')->middleware('check_ability:send_mails');
});