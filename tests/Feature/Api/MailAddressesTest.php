<?php

namespace Tests\Feature\Api;

use App\Role;
use App\User;
use Tests\TestCase;

class MailAddressesTest extends TestCase
{
    /** @test */
    public function an_admin_can_query_all_mails()
    {
        $this->signInAdmin();

        create(User::class, [], 50);

        $addresses = User::where('email', 'LIKE', '%a%')->pluck('email')->toArray();

        $this->post(route('api.mailAddresses', ['query' => 'a']))
            ->assertExactJson($addresses);
    }

    /** @test */
    public function an_admin_has_access_to_all_mail_categories()
    {
        $this->signInAdmin();

        create(User::class, [], 50);

        $addresses = $this->getRoleMails()->merge($this->getFloorMails())->toArray();

        $this->get(route('api.mailAddresses'))
            ->assertExactJson($addresses);
    }

    private function getRoleMails($roles = [])
    {
        $roles = collect($roles);

        if ($roles->isEmpty()) {
            $roles = Role::with('users')->get();
        } else {
            $roles = Role::whereIn('name', $roles)->with('users')->get();
        }

        return collect([
            'roles' => $roles->pluck('users', 'name')->map(function ($users) {
                return $users->pluck('email');
            })->sort(),
        ]);
    }

    private function getFloorMails($floor = null)
    {
        if (isset($floor)) {
            $users = User::where('floor', $floor)->get(['floor', 'email']);
        } else {
            $users = User::get(['floor', 'email']);
        }

        return collect([
            'floors' => $users->mapToGroups(function ($user) {
                return [$user['floor'] => $user['email']];
            })->sortKeys(),
        ]);
    }

    /** @test */
    public function an_user_with_send_Mails_permission_has_access_to_all_mail_categories()
    {
        $this->signIn($user = create(User::class), 'send_mails');

        create(User::class, [], 50);

        $addresses = $this->getRoleMails()->merge($this->getFloorMails())->toArray();

        $this->get(route('api.mailAddresses'))
            ->assertExactJson($addresses);
    }

    /** @test */
    public function an_user_with_send_roleMails_permission_has_only_access_to_role_mails()
    {
        $this->signIn($user = create(User::class), 'send_roleMails');

        create(User::class, [], 50);

        $addresses = collect([$this->getRoleMails()])->toArray();

        $this->get(route('api.mailAddresses'))
            ->assertExactJson($addresses);
    }

    /** @test */
    public function an_user_with_send_floorMails_permission_has_only_access_to_his_floor_mails()
    {
        $this->signIn($user = create(User::class), 'send_floorMails');

        create(User::class, [], 50);

        $addresses = collect([$this->getFloorMails($user->floor)])->toArray();

        $this->get(route('api.mailAddresses'))
            ->assertExactJson($addresses);
    }

    /** @test */
    public function an_unauthorized_user_cannot_query_any_addresses()
    {
        $this->withExceptionHandling()->signIn();

        create(User::class, [], 50);

        $this->post(route('api.mailAddresses', ['query' => 'a']))
            ->assertStatus(403);
    }

    /** @test */
    public function an_unauthorized_user_cannot_see_any_address_categories()
    {
        $this->withExceptionHandling()->signIn();

        create(User::class, [], 50);

        $this->get(route('api.mailAddresses'))
            ->assertStatus(403);
    }

    /** @test */
    public function query_parameter_is_required()
    {
        $this->withExceptionHandling()->signInAdmin();

        create(User::class, [], 50);

        $this->json('post', route('api.mailAddresses'))
            ->assertJsonValidationErrors('query');
    }
}
