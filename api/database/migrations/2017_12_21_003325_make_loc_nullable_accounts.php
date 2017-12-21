<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeLocNullableAccounts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('Accounts', function (Blueprint $table) {
          $table->string('loc_country')->nullable()->change();
          $table->string('loc_state')->nullable()->change();
          $table->string('loc_city')->nullable()->change();
          $table->string('loc_neighbourhood')->nullable()->change();
          $table->string('loc_complement')->nullable()->change();
          $table->string('loc_postal_code')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Accounts', function (Blueprint $table) {
            //
        });
    }
}
