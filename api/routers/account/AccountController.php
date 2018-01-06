<?php
namespace App\routers\account;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\account\Account;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class AccountController extends BaseRestController {
    public const MODEL = Account::class;

    // public function readOne(string $id, array $fields = ['*'], $relations = null){
        
    //     $acc = Account::fromId($id, $fields, $relations);
        
    //     if($acc === null){
    //         $this->_404();
    //     }
    //     return $acc;
    // }
    // public function readAll(){
    //     return Account::all();
    // }
    // public function create(array $data){
    //     $data = $this->preFillData($data);
        
    //     $acc = new Account($data);
    //     $acc->save();

    //     return $acc;
    // }
    // public function update($id, array $data){
    //     $data = $this->preFillData($data);

    //     $acc = Account::fromId($id);

        
    //     if($acc === null){
    //         $this->_404();
    //     }
        
    //     $acc->fill($data);
    //     $acc->save();
        
    //     return $acc;
    // }
    public function preFillData($data = []){
        if(isset($data['password']))
            $data['password'] = self::passwordHash($data['password']);


        return $data;
    }
    
    public function _404(){
        parent::_404('Email');
    }
    public static function passwordHash($password){
        return \crypt($password, base64_encode('pedrotorchio'));
    }
}