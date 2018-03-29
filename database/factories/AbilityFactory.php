<?php

use Faker\Generator as Faker;
use Silber\Bouncer\Database\Ability;

$factory->define(Ability::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->word,
        'title' => $faker->sentence,
    ];
});
