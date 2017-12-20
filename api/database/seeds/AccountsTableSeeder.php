<?php

use Illuminate\Database\Seeder;
use App\Account;

class AccountsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Account::truncate();

        $faker = \Faker\Factory::create('pt_BR');

        for($i = 0 ; $i < 50 ; $i++){
          $gender = $faker->numberBetween(1, 2);
          $genderStr = $gender > 1 ? 'male' : 'female';
          $fName = $faker->firstName($genderStr);
          $lName = $faker->lastName($genderStr);
          Account::create([
            'email' => $faker->email,
            'password' => bcrypt('secret'),
            'grant_type' => 'password',
            'email_verified' => true,
            'display_name' => "{$fName} {$lName}",
            'first_name' => $fName,
            'last_name' => $lName,
            'pictureUrl' => $faker->imageUrl(300,300),
            'phone' => $faker->phoneNumber,
            'gender' => $gender,
            'addr_country' => $faker->country,
            'addr_state' => $faker->stateAbbr,
            'addr_city' => $faker->city,
            'addr_neighbourhood' => $faker->city,
            'addr_complement' => $faker->streetAddress,
            'addr_postal_code' => $faker->postcode
          ]);
        }
    }
}
