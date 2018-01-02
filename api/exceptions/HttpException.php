<?php
namespace App\exceptions;
class HttpException extends \Exception{
    protected $httpCode =  200;
    protected $data = null;
    public function __construct(string $message = '', int $code = 0, int $httpCode = 200){
        parent::__construct($message, $code);
        $this->httpCode = $httpCode;
    }
    public function getHttpStatusCode(){
        return $this->httpCode;
    }
    public function getData(){
        return $this->data;
    }
    public function setData($data){
        $this->data = $data;

        return $this;
    }
}