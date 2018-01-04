<?php
namespace App\models\validators;

class Conversion{
    
    protected static function boolean2TinyInt($boolean, $fieldName = ''){
        if($boolean === 'true' || $boolean === true || $boolean === 1)
            return 1;
        else if($boolean === 'false' || $boolean === false || $boolean === 0)
            return 0;

        throw new ValidationException('Booleano inválido' . ($fieldName ? ": {$fieldName}" : ''));
    }
}