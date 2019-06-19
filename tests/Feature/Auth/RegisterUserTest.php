<?php

namespace Tests\Feature\Auth;

use App\User;
use Tests\TestCase;
use App\Mail\ConfirmEmailMail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegisterUserTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        Mail::fake();
    }

    /** @test */
    public function users_can_register_an_account()
    {
        $ownerDorm = config('dms.owner_dorm');

        $response = $this->post(route('register'), $this->validParams());

        $response->assertRedirect(route('home'));

        $this->assertTrue(Auth::check());

        $this->assertCount(1, User::all());

        tap(User::first(), function ($user) use ($ownerDorm) {
            $this->assertEquals('John', $user->firstname);
            $this->assertEquals('Doe', $user->lastname);
            $this->assertEquals('johndoe', $user->username);
            $this->assertEquals('johndoe@example.com', $user->email);
            $this->assertEquals('12', $user->floor);
            $this->assertEquals('9', $user->room);
            $this->assertEquals($ownerDorm, $user->house);
            $this->assertTrue(Hash::check('secret', $user->password));
        });
    }

    /** @test */
    public function a_confirmation_email_is_sent_upon_registration()
    {
        $this->post(route('register'), $this->validParams());

        Mail::assertQueued(ConfirmEmailMail::class);
    }

    /** @test */
    public function user_can_fully_confirm_their_email_addresses()
    {
        $this->post(route('register'), $this->validParams([
            'email' => 'john@example.com',
        ]));

        $user = User::whereEmail('john@example.com')->first();

        $this->assertFalse($user->confirmed);

        $this->assertNotNull($user->confirmation_token);

        $this->get(route('register.confirm', ['token' => $user->confirmation_token]))
            ->assertRedirect(route('home'));

        tap($user->fresh(), function ($user) {
            $this->assertTrue($user->confirmed);
            $this->assertNull($user->confirmation_token);
        });
    }

    /** @test */
    public function confirming_an_invalid_token()
    {
        $this->get(route('register.confirm', ['token' => 'invalid']))
            ->assertRedirect(route('home'))
            ->assertSessionHas('flash', 'Unknown token.');
    }

    /** @test */
    public function firstname_is_required()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'firstname' => '',
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('firstname');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function firstname_cannot_exceed_100_chars()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'firstname' => str_repeat('a', 101),
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('firstname');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function lastname_is_required()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'lastname' => '',
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('lastname');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function lastname_cannot_exceed_100_chars()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'lastname' => str_repeat('a', 101),
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('lastname');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function username_is_required()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'username' => '',
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('username');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function username_is_url_safe()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'username' => 'spaces and symbols!',
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('username');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function username_cannot_exceed_255_chars()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'username' => str_repeat('a', 256),
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('username');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function username_is_unique()
    {
        create('App\User', ['username' => 'john']);

        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'username' => 'john',
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('username');

        $this->assertFalse(Auth::check());

        $this->assertCount(1, User::all());
    }

    /** @test */
    public function email_is_required()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'email' => '',
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('email');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function email_is_valid()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'email' => 'not-an-email-address',
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('email');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function email_cannot_exceed_255_chars()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'email' => substr(str_repeat('a', 256).'@example.com', -256),
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('email');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function email_is_unique()
    {
        create('App\User', ['email' => 'johndoe@example.com']);

        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'email' => 'johndoe@example.com',
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('email');

        $this->assertFalse(Auth::check());

        $this->assertCount(1, User::all());
    }

    /** @test */
    public function password_is_required()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'password' => '',
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('password');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function password_must_be_confirmed()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'password' => 'foo',
            'password_confirmation' => 'bar',
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('password');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function password_must_be_6_chars()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'password' => 'foo',
            'password_confirmation' => 'foo',
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('password');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function floor_is_required()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'floor' => '',
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('floor');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function floor_can_not_exceed_255()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'floor' => 256,
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('floor');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function room_is_required()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'room' => '',
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('room');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function room_can_not_exceed_255()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $response = $this->post(route('register'), $this->validParams([
            'room' => 256,
        ]));

        $response->assertRedirect(route('register'));

        $response->assertSessionHasErrors('room');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());
    }

    /** @test */
    public function only_valid_houses_are_accepted()
    {
        $this->withExceptionHandling();

        $this->from(route('register'));

        $this->post(route('register'), $this->validParams([
            'house' => 'invalid house name',
        ]))
            ->assertRedirect(route('register'))
            ->assertSessionHasErrors('house');

        $this->assertFalse(Auth::check());

        $this->assertCount(0, User::all());

        $validDorm = config('dms.dorms');
        $validDorm = array_random($validDorm);

        $this->post(route('register'), $this->validParams([
            'house' => $validDorm,
        ]))
            ->assertRedirect(route('home'));

        $this->assertTrue(Auth::check());

        $this->assertCount(1, User::all());
    }

    /** @test */
    public function a_new_user_gets_member_role()
    {
        $this->seed(\RoleTableSeeder::class);

        $this->post(route('register'), $this->validParams());

        tap(User::first(), function ($user) {
            $this->assertTrue($user->isA('member'));
        });
    }

    private function validParams($overrides = [])
    {
        $ownerDorm = config('dms.owner_dorm');

        return array_merge([
            'firstname' => 'John',
            'lastname' => 'Doe',
            'username' => 'johndoe',
            'email' => 'johndoe@example.com',
            'floor' => 12,
            'room' => 9,
            'house' => $ownerDorm,
            'password' => 'secret',
            'password_confirmation' => 'secret',
        ], $overrides);
    }
}
