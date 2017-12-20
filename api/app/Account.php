<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $fillable = [
      'password',
      //'api_token',
      //'remember_token',
      'email_verified',
      'grant_type',
      'pers_email',
      'pers_display_name',
      'pers_first_name',
      'pers_last_name',
      'pers_picture_url',
      'pers_phone',
      'pers_gender',
      'pers_language',
      'pers_occupation',
      'loc_country',
      'loc_state',
      'loc_city',
      'loc_neighbourhood',
      'loc_complement',
      'loc_postal_code'
    ];


}
