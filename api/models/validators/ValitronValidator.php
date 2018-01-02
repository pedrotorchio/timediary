<?php 
namespace App\models\validators;
use Valitron\Validator as Valitron;
use \App\models\validators\Validator;
use \App\models\exceptions\ValidationException;

class ValitronValidator extends Validator{
    public function validate(){
        if($this->data === null || empty($this->data))
            return;
        $v = new Valitron($this->data);
        foreach($this->rules as $field => $rules){
            foreach($rules as $rule){                
                if($this->isFunction($rule)){

                }else if(!empty($rule)){
                    $v->rule($rule, $field);
                }
                
            }
        }
        if($v->validate()){
            return true;
        }
        else{
            var_dump($v->errors()); die();
            throw new ValidationException();
        }
    }
}