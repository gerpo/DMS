<?php

namespace App\Console\Commands;

use App\User;
use Illuminate\Console\Command;

class MakeAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dms:makeAdmin {user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make a given user an admin.';

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
            $user->assign('admin');
            $this->line("{$user->email} was successfully made an admin.");
        } else {
            $this->line("No user found where username or email is '{$this->argument('user')}'");
        }
    }
}
