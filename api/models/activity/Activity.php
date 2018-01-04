<?php
namespace App\models\activity;

use \App\models\BaseModel;
use \App\models\validators\ValitronValidator as Validator;
use \App\models\category\Category;
class Activity extends BaseModel{
    public const TABLE = 'activity';
    public const ID_FIELD = 'id';
    public const RELATIONSHIP_FIELDS = ['category'];
    public const FIELDS = [
        'title' => '',
        'category'=>'integer'
    ];
    public function category(){
        return $this->belongsTo(Category::class, 'category');
    }

}