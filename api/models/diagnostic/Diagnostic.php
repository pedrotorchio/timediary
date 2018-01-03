<?php
namespace App\models\account;

use \App\models\BaseModel;
use \App\models\validators\ValitronValidator as Validator;

class Diagnostic extends BaseModel{
    public const TABLE = 'diagnostic';
    public const ID_FIELD = 'id';
    public const FIELDS = [
        'id' => '',
        'diagnostic' => 'alphaNum'
    ];
}