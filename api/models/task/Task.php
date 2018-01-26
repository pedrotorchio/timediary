<?php
namespace App\models\task;

use \App\models\BaseModel;
use \App\models\validators\ValitronValidator as Validator;
use \App\models\activity\Activity;
use \App\models\subject\Subject;

class Task extends BaseModel{
    public const TABLE = 'task';
    public const ID_FIELD = 'id';
    public const RELATIONSHIP_FIELDS = ['secondary_activity' => 'activity', 'subject' => 'subject', 'activity' => 'activity'];
    public const FIELDS = [
        'id' => '',
        'title' => '',
        'root' => 'integer&required',
        'duration' => 'integer',
        'location' => '',
        'company' => '',
        'secondary_activity' => 'integer',
        'independency_lvl' => 'integer',
        'subject' => 'integer&required',                
        'status' => 'boolean'
    ];
    public function secondary_activity(){
        return $this->belongsTo(Activity::class, 'secondary_activity_id');
    }
    public function subject(){
        return $this->belongsTo(Subject::class, 'subject_id');
    }
    public function activity(){
        return $this->belongsTo(Activity::class, 'activity_id');
    }
}