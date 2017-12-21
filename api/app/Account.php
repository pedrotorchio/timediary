<?php
namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Account extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = self::FIELDS;

    public const FIELDS = [
      'password',
      'api_token',
      'remember_token',
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


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        //'password', 'remember_token', 'api_token'
    ];


}
