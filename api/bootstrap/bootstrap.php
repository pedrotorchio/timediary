<?php
namespace bootstrap\procedures;

// PROCEDIMENTOS

// accountsUpTo(10);


// PROCEDIMENTOS FIM
use \App\models\account\Account;


function accountsUpTo($num){
    $num = $num - Account::count();
    
    $faker = \Faker\Factory::create('pt_BR');
    for($i = $num; $i > 0; $i--){
        
        $gender = $faker->numberBetween(1, 2);
        $genderStr = $gender > 1 ? 'male' : 'female';
        $fName = $faker->firstName($genderStr);
        $lName = $faker->lastName($genderStr);


        $params = [
            'password' => $faker->password,
            'api_token' => null,
            'email_verified' => $faker->numberBetween(0, 10) % 4  ==  0  ? false : true,
            'grant_type' => 'password',
            'pers_email' => $faker->email,
            'pers_display_name'=> "{$fName} {$lName}",
            'pers_first_name'=> $fName,
            'pers_last_name'=> $lName,
            'pers_picture_url'=> $faker->imageUrl(300,300),
            'pers_phone'=> $faker->phoneNumber,
            'pers_gender'=> $gender,
            'pers_language'=> $faker->languageCode,
            'pers_occupation'=> $faker->jobTitle,
            'loc_country'=> $faker->country,
            'loc_state'=> $faker->state,
            'loc_city'=> $faker->city,
            'loc_neighbourhood'=> $faker->city,
            'loc_complement'=> $faker->streetAddress,
            'loc_postal_code' => $faker->postcode
        ];
        
        Account::create($params);
    }
}