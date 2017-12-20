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

            $table->string('password');
            $table->string('api_token', 60)->nullable();
            $table->boolean('email_verified')->default(false);
            $table->string('grant_type');

            // Person
            $table->string('pers_email')->unique();
            $table->string('pers_display_name');
            $table->string('pers_first_name')->nullable();
            $table->string('pers_last_name')->nullable();
            $table->string('pers_picture_url')->nullable();
            $table->string('pers_phone')->nullable();
            $table->string('pers_gender')->nullable();
            $table->string('pers_language')->nullable();
            $table->string('pers_occupation')->nullable();
            // Location
            $table->string('loc_country');
            $table->string('loc_state');
            $table->string('loc_city');
            $table->string('loc_neighbourhood');
            $table->string('loc_complement');
            $table->string('loc_postal_code');

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
