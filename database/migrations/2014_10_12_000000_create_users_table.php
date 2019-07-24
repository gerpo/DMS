<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->unsignedTinyInteger('floor');
            $table->unsignedTinyInteger('room');
            $table->string('full_room');
            $table->string('house');
            $table->string('password');
            $table->boolean('is_subtenant')->default(false);
            $table->boolean('is_active')->default(true);
            $table->boolean('confirmed')->default(false);
            $table->string('confirmation_token', 25)->nullable()->unique();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
