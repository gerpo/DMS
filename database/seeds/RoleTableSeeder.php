<?php

use App\Role;
use Illuminate\Database\Seeder;

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
            'name' => 'resident',
            'title' => 'A resident of this house',
        ]);

        factory(Role::class)->create([
            'name' => 'admin',
            'title' => 'Administrator',
        ]);
    }
}
