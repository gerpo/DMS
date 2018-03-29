<?php

use Faker\Generator as Faker;
use Silber\Bouncer\Database\Role;

$factory->define(Role::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->word,
        'title' => $faker->sentence,
    ];
});
