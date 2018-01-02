<?php
namespace App\models\account;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Capsule\Manager as Capsule;
use \App\models\BaseModel;
use \App\models\validators\ValitronValidator as Validator;

class Account extends BaseModel{
    public const TABLE = 'account';
    public const ID_FIELD = 'pers_email';
    public const FIELDS = [
        'id' => '',
        'api_token' => '',
        'remember_token' => '',
        'email_verified' => '',
        'grant_type' => '',
        'pers_email' => 'email',
        'pers_display_name' => 'alphaNum',
        'pers_first_name' => 'alphaNum',
        'pers_last_name' => 'alphaNum',
        'pers_picture_url' => 'url',
        'pers_phone' => 'alphaNum',
        'pers_gender' => 'alphaNum',
        'pers_language' => 'alphaNum',
        'pers_occupation' => 'alphaNum',
        'loc_country' => 'alphaNum',
        'loc_state' => 'alphaNum',
        'loc_city' => 'alphaNum',
        'loc_neighbourhood' => 'alphaNum',
        'loc_complement' => 'alphaNum',
        'loc_postal_code' => 'alphaNum', 
        'password' => '',
        'status' => 'boolean'
    ];
    protected $hidden = ['password'];
    protected $validator = null;
    
    public function __construct(array $data = []){
        parent::__construct($data);
        $this->validator = (new Validator())->setRules(self::FIELDS);
    }
}