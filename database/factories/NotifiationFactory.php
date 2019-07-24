<?php


use App\User;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Notification::class, function (Faker $faker) {
    return [
        'title' => $faker->title,
        'message' => $faker->text,
        'is_active' => false,
        'user_id' => factory(User::class)->create()->id,
    ];
});
