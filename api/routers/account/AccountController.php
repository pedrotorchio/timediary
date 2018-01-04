<?php
namespace App\routers\account;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\account\Account;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class AccountController extends BaseRestController {
    
    protected function readOne(string $id){
        $acc = Account::fromId($id);
        
        if($acc === null){
            $this->_404();
        }

        return $acc;
    }
    protected function readAll(){
        return Account::all();
    }
    protected function create(array $data){
        $acc = new Account($data);
        $acc->save();

        return $acc;
    }
    protected function update($id, array $data){
        $acc = Account::fromId($id);
        
        if($acc === null){
            $this->_404();
        }

        $acc->fill($data);
        $acc->save();

        return $acc;
    }
    protected function delete($id){}
        protected function _404(){
            throw (new HttpException(
                "Email não encontrado",
                21,
                404
            ));
        }
}