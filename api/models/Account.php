<?php
namespace App\models;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Capsule\Manager as Capsule;

class Account extends BaseModel{
    public const TABLE = 'account';
    public const ID_FIELD = 'pers_email';
    protected $hidden = ['password'];
    protected $table = self::TABLE;

    protected $fillable = [
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
        'loc_postal_code', 
        'password',
        'status'
    ];

}