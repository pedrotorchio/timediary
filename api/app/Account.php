<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $fillable = ['email', 'password', 'grant_type', 'email_verified', 'display_name', 'first_name', 'last_name', 'pictureUrl', 'phone', 'gender', 'addr_country', 'addr_state', 'addr_city', 'addr_neighbourhood', 'addr_complement', 'addr_postal_code'];


}
