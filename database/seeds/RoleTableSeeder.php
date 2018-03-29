<?php

use Illuminate\Database\Seeder;
use Silber\Bouncer\Database\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Role::class)->create([
            'name' => 'member',
            'title' => 'A regular user',
        ]);

        factory(Role::class)->create([
            'name' => 'admin',
            'title' => 'Administrator',
        ]);
    }
}
