<?php
namespace App\models\subject;

use \App\models\BaseModel;
use \App\models\validators\ValitronValidator as Validator;

class Subject extends BaseModel{
    public const TABLE = 'subject';
    public const ID_FIELD = 'id';
    public const FIELDS = [
        'id' => '',
        'pers_email' => 'email',
        'pers_display_name' => 'alphaNum',
        'pers_first_name' => 'alphaNum',
        'pers_last_name' => 'alphaNum',
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
        'education_years' => 'integer',
        'diagnostic' => 'integer',
        'status' => 'boolean'
    ];
    public function diagnostics(){
        return $this->belongsToMany('App\models\diagnostic\Diagnostic', 'diagnostic_x_subject', 'subject', 'diagnostic');
    }
    public function diagnostic()
    {
        return $this->hasOne('App\models\diagnostic\Diagnostic', 'main_diagnostic');
    }
    public function fill(array $data){
        // var_dump($data); die();
        if(isset($data['diagnostics']))
            $this->diagnostics()->attach($data['diagnostics']);
        unset($data['diagnostics']);
        
        parent::fill($data);
    }

}