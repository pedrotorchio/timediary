<?php
namespace App\routers\account;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\account\Account;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class AccountController extends BaseRestController {
    public const MODEL = Account::class;

    public function preFillData($data = []){
        if(isset($data['password']))
            $data['password'] = self::passwordHash($data['password']);

        
        return $data;
    }
    
    public function _404(string $field = 'Email'){
        parent::_404($field);
    }
    public static function passwordHash($password){
        return \crypt($password, base64_encode('pedrotorchio'));
    }
}