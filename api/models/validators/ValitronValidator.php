<?php 
namespace App\models\validators;
use Valitron\Validator as Valitron;
use \App\models\validators\Validator;
use \App\exceptions\ValidationException;

class ValitronValidator extends Validator{
    public function validate(){
        
        
        if($this->data === null || empty($this->data))
            return;
        $v = new Valitron($this->data);
        foreach($this->rules as $field => $rules){
            foreach($rules as $rule){                
                if($this->isFunction($rule)){
                    // se rule for no formato rule(value)
                }else if(!empty($rule)){
                    $v->rule($rule, $field)->message($rule);
                }
                
            }
        }
        if($v->validate()){
            
            return true;
        }
        else{
            
            throw (new ValidationException("Dados inválidos"))->setData($this->makeExceptionData($v->errors()));
        }
    }
    protected function makeExceptionData(array $errors){
        $errorz = ['format'=>'errors[field_name][rule][message]'];
        foreach($errors as $field => $error){
            
            foreach($error as $rule){
                $errorz['errors'][$field][$rule] = $this->errorMessage($field, $rule);
            }
        }

        return $errorz;
    }
    protected function errorMessage(string $field, string $rule){
        $name = $this->getRealFieldName($field);
        $msg  = $this->getRuleMessage($rule);
        
        $message = "{$name} {$msg}";

        return trim($message);
    }
    protected function getRealFieldName(string $field){
        $name = $field;
        switch($field){ 
            case 'pers_email':
                $name = 'Email'; break;
        }
        return $name;
    }
    protected function getRuleMessage(string $rule, bool $feminino = false){
        $msg = '';
        switch($rule){
            case 'email':case 'alphaNum':
                $msg = 'é inválido'; break;
            case 'required':
                $msg = 'é necessário'; break;
        }
        return $msg;
    }

}