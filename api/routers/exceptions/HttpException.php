<?php
namespace App\routers\exceptions;
class HttpException extends \Exception{
    protected $httpCode =  200;
    public function __construct(string $message = '', int $code = 0, int $httpCode = 200){
        parent::__construct($message, $code);
        $this->httpCode = $httpCode;
    }
    public function getHttpStatusCode(){
        return $this->httpCode;
    }
}