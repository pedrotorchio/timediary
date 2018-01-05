<?php
namespace App\routers\account;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\account\Account;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class AccountController extends BaseRestController {
    
    public function readOne(string $id){
        $acc = Account::fromId($id);
        
        if($acc === null){
            $this->_404();
        }
        return $acc;
    }
    public function readAll(){
        return Account::all();
    }
    public function create(array $data){
        $data = $this->preFillData($data);
        
        $acc = new Account($data);
        $acc->save();

        return $acc;
    }
    public function update($id, array $data){
        $data = $this->preFillData($data);

        $acc = Account::fromId($id);

        
        if($acc === null){
            $this->_404();
        }
        
        $acc->fill($data);
        $acc->save();
        
        return $acc;
    }
    public function preFillData($data = []){
        if(isset($data['password']))
            $data['password'] = self::passwordHash($data['password']);


        return $data;
    }
    public function delete($id){}
    public function _404(){
        throw (new HttpException(
            "Email não encontrado",
            21,
            404
        ));
    }
    public static function passwordHash($password){
        return \crypt($password, base64_encode('pedrotorchio'));
    }
}