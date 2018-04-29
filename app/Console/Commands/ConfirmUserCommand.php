<?php

namespace App\Console\Commands;

use App\User;
use Illuminate\Console\Command;

class ConfirmUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dms:confirmUser {user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = User::where('username', $this->argument('user'))
            ->orWhere('email', $this->argument('user'))
            ->first();

        if ($user != null) {
            $user->confirm();
            $this->line("{$user->email} was successfully confirmed.");
        } else {
            $this->line("No user found where username or email is '{$this->argument('user')}'");
        }
    }
}
