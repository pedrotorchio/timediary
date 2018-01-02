<?php
namespace App\exceptions;

class ValidationException extends HttpException{
    
    public function __construct(string $message = ''){
        parent::__construct($message, 10, 400);    
    }
    
}