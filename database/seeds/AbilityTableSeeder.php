<?php

use Illuminate\Database\Seeder;

class AbilityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Bouncer::ability()->create([
            'name' => 'manage_users',
            'title' => 'Manage users.'
        ]);

        Bouncer::ability()->create([
            'name' => 'manage_roles',
            'title' => 'Manage roles and abilities.'
        ]);

        Bouncer::ability()->create([
            'name' => 'send_mails',
            'title' => 'Send mails to all residents.'
        ]);

        Bouncer::ability()->create([
            'name' => 'send_roleMails',
            'title' => 'Send mails to all users with a role.'
        ]);

        Bouncer::ability()->create([
            'name' => 'send_floorMails',
            'title' => 'Send mails to all residents of the own floor.'
        ]);
    }
}
