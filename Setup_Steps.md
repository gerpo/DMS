1. Bouncer migration needs to be published 
    -   php artisan vendor:publish --tag="bouncer.migrations"
2. Admin user needs to be setup. A user with test@dms.com is set up during seeder right now.
3. Seeds need to be run for roles and abilities.
    -   php artisan migrate --seed