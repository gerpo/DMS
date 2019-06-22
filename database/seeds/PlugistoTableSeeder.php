<?php

use Illuminate\Database\Seeder;
use Gerpo\Plugisto\Models\Plugisto;

class PlugistoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Plugisto::create([
            'name' => 'Profile',
            'description' => 'View and manage user profile.',
            'route' => '/me',
            'namespace' => 'gerpo/dms/profile',
            'manually_added' => true,
        ]);

        Plugisto::create([
            'name' => 'Residents',
            'description' => 'View and manage residents.',
            'route' => '/users',
            'namespace' => 'gerpo/dms/users',
            'manually_added' => true,
            'needed_permission' => 'manage_users',
        ]);

        Plugisto::create([
            'name' => 'Roles',
            'description' => 'View and manage roles.',
            'route' => '/roles',
            'namespace' => 'gerpo/dms/roles',
            'manually_added' => true,
            'needed_permission' => 'manage_roles',
        ]);

        Plugisto::create([
            'name' => 'Mails',
            'description' => 'Send mails to groups or residents.',
            'route' => '/mails',
            'namespace' => 'gerpo/dms/mails',
            'manually_added' => true,
            'needed_permission' => 'send_mails',
        ]);

        Plugisto::create([
            'name' => 'Plugins',
            'description' => 'View and manage installed plugins.',
            'route' => '/plugins',
            'namespace' => 'gerpo/dms/plugins',
            'manually_added' => true,
            'needed_permission' => 'manage_plugins',
        ]);
    }
}
