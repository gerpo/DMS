<?php

use App\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleTableSeeder::class);
        $this->call(AbilityTableSeeder::class);
        $this->call(PlugistoTableSeeder::class);

        factory(User::class)->create(['email' => 'test@dms.com']);
        Artisan::call('dms:makeAdmin', ['user' => 'test@dms.com']);
    }
}
