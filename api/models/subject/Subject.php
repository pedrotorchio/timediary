<?php
namespace App\models\subject;

use \App\models\BaseModel;
use \App\models\validators\ValitronValidator as Validator;
use \App\models\diagnostic\Diagnostic;
use \App\models\account\Account;
use \App\models\task\Task;

class Subject extends BaseModel{
    public const TABLE = 'subject';
    public const ID_FIELD = 'id';
    public const RELATIONSHIP_FIELDS = ['diagnostics', 'main_diagnostic', 'tasks', 'accounts'];
    public const FIELDS = [
        
        'pers_email' => '',
        'pers_display_name' => '',
        'pers_first_name' => '',
        'pers_last_name' => '',
        'pers_birth' => 'date',
        'pers_picture_url' => 'url',
        'pers_phone' => '',
        'pers_gender' => '',
        'pers_language' => '',
        'pers_occupation' => '',
        'loc_country' => '',
        'loc_state' => '',
        'loc_city' => '',
        'loc_neighbourhood' => '',
        'loc_complement' => '',
        'loc_postal_code' => '', 
        'education_years' => 'integer',
        'main_diagnostic' => 'integer',
        
    ];
    public function diagnostics(){
        return $this->belongsToMany(Diagnostic::class, 'diagnostic_x_subject', 'subject', 'diagnostic');
    }
    public function accounts(){
        return $this->belongsToMany(Account::class, 'account_x_subject', 'subject', 'account');
    }
    public function tasks(){
        return $this->hasMany(Task::class, 'subject');
    }
    public function main_diagnostic()
    {
        return $this->belongsTo(Diagnostic::class, 'main_diagnostic');
    }
    public function fill(array $data){
        
        if(isset($data['diagnostics']))
            $this->diagnostics()->attach($data['diagnostics']);
        unset($data['diagnostics']);
        
        parent::fill($data);
    }

}