<?php
namespace App\models\account;

use \App\models\BaseModel;
use \App\models\validators\ValitronValidator as Validator;
use \App\models\subject\Subject;

class Account extends BaseModel{
    public const TABLE = 'account';
    public const ID_FIELD = 'pers_email';
    public const RELATIONSHIP_FIELDS = ['children', 'subjects'];
    public const FIELDS = [
        
        'api_token' => '',
        'remember_token' => '',
        'email_verified' => '',
        'grant_type' => '',
        'pers_email' => 'email',
        'pers_display_name' => '',
        'pers_first_name' => '',
        'pers_last_name' => '',
        'pers_birth' => 'date',
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
        'salt' => '',
        'password' => ''
    ];
    protected $hidden = ['password', 'salt'];

    public function children(){
        return $this->hasMany(Account::class, 'root');
    }
    public function subjects(){
        return $this->belongsToMany(Subject::class, 'account_x_subject', 'account', 'subject');
    }
    public function fill(array $data=[]){
        if(empty($data['pers_display_name'])){
            if(!empty($data['pers_first_name'])){
                $data['pers_display_name'] = $data['pers_first_name'];
                if(!empty($data['pers_last_name']))
                    $data['pers_display_name'] .= ' ' . $data['pers_last_name'];
            }
            else
                $data['pers_display_name'] = $data['pers_email'];
                
        }
        parent::fill($data);
    }
}