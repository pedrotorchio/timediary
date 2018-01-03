<?php
namespace App\models\diagnostic;

use \App\models\BaseModel;
use \App\models\validators\ValitronValidator as Validator;

class Diagnostic extends BaseModel{
    public const TABLE = 'diagnostic';
    public const ID_FIELD = 'id';
    public const FIELDS = [
        'id' => '',
        'diagnostic' => 'alphaNum'
    ];

    public function subjects(){
        return $this->belongsToMany('App\models\subject\Subject', 'diagnostic_x_subject', 'diagnostic', 'subject');
    }
    public function fill(array $data){
        if(isset($data['subjects']))
            $this->subjects()->attach($data['subjects']);
        unset($data['subjects']);
        
        parent::fill($data);
    }
}