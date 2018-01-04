<?php
namespace App\models\category;

use \App\models\BaseModel;
use \App\models\validators\ValitronValidator as Validator;

class Category extends BaseModel{
    public const TABLE = 'activity_category';
    public const ID_FIELD = 'id';
    public const FIELDS = [
        
        'title' => '',
        'macro' => '',
    ];

}