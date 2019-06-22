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

use App\Http\Middleware\OnlyAuthedUser;
use App\User;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/register/confirm', 'Api\RegisterConfirmationController@index')->name('register.confirm');

Route::group(['middleware' => 'auth'], function () {
    Route::get('/home', 'HomeController@index')->name('home');

    Route::get('/users', 'UsersController@index')->name('users')->middleware('check_ability:manage_users');
    Route::get('/users/{user}', 'UsersController@show')->name('users.show')->middleware('check_ability:manage_users');

    Route::get('/roles', 'RolesController@index')->name('roles');
    Route::post('/roles',
        'Api\RolesController@store')->name('api.roles.store')->middleware('check_ability:manage_roles');
    Route::delete('/roles/{role}',
        'Api\RolesController@destroy')->name('api.roles.destroy')->middleware('check_ability:manage_roles');

    Route::get('/abilities', 'AbilitiesController@index')->name('abilities');
    Route::post('/abilities',
        'AbilitiesController@store')->name('abilities.store')->middleware('check_ability:manage_roles');

    Route::post('/roles/{role}/abilities',
        'Api\RoleAbilitiesController@store')->name('api.role-abilities.store')->middleware('check_ability:manage_roles');
    Route::delete('/roles/{role}/abilities',
        'Api\RoleAbilitiesController@destroy')->name('api.role-abilities.destroy')->middleware('check_ability:manage_roles');

    Route::get('/role-poster', 'RolePosterController@index');

    Route::post('/users/{user}/roles',
        'Api\UserRolesController@store')->name('api.user-roles.store')->middleware('check_ability:manage_users');
    Route::delete('/users/{user}/roles',
        'Api\UserRolesController@destroy')->name('api.user-roles.destroy')->middleware('check_ability:manage_users');

    Route::get('/plugins', 'PluginsController@index')->name('plugins');
    Route::patch('/plugins/{plugin}',
        'Api\PluginsController@update')->name('api.plugins.update')->middleware('check_ability:manage-plugins');
    Route::delete('/plugins/{plugin}',
        'Api\PluginsController@destroy')->name('api.plugins.destroy')->middleware('check_ability:manage-plugins');

    Route::get('/mails', 'MailsController@index')->name('mails');
    Route::post('/mails',
        'MailsController@store')->name('mails.store')->middleware('check_ability:send_mails,send_floorMails,send_roleMails');

    Route::get('/api/mail-groups', 'Api\MailGroupController@index')->name('api.mailGroups');

    Route::get('/api/addresses',
        'Api\MailAddressesController@index')->name('api.mailAddresses')->middleware('check_ability:send_mails,send_roleMails,send_floorMails');
    Route::post('/api/addresses',
        'Api\MailAddressesController@query')->name('api.mailAddressesQuery')->middleware('check_ability:send_mails');

    Route::post('/api/attachments',
        'Api\MailAttachmentsController@store')->name('api.mailAttachments')->middleware('check_ability:send_mails');
    Route::delete('/api/attachments',
        'Api\MailAttachmentsController@destroy')->name('api.mailAttachments.destroy')->middleware('check_ability:send_mails');

    Route::get('/api/users', 'Api\UsersController@index')->name('api.users')->middleware('check_ability:manage_users');
    Route::post('/api/users/{user}',
        'Api\UsersController@update')->name('api.users.update')->middleware('check_ability:manage_users');
    Route::post('/api/users/{user}/email',
        'Api\UserEmailController@update')->name('api.user.email')->middleware(OnlyAuthedUser::class);
    Route::post('/api/users/{user}/password',
        'Api\UserPasswordController@update')->name('api.user.password')->middleware(OnlyAuthedUser::class);

    Route::get('/me', function () {
        $user = User::where('id', auth()->user()['id'])->with(['roles', 'abilities'])->first();

        return view('profile')->with(['user' => $user]);
    });
});
