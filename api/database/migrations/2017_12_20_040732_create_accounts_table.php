<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('grant_type');
            $table->boolean('email_verified');

            $table->string('display_name');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('pictureUrl');
            $table->string('phone');
            $table->string('gender');
            $table->string('addr_country');
            $table->string('addr_state');
            $table->string('addr_city');
            $table->string('addr_neighbourhood');
            $table->string('addr_complement');
            $table->string('addr_postal_code');

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
        Schema::dropIfExists('accounts');
    }
}
