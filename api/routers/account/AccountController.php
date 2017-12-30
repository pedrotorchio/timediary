<?php
namespace App\routers\account;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\Account;
use \App\routers\BaseRestController;
use \App\routers\exceptions\HttpException;

class AccountController extends BaseRestController {
    
    protected function readOne(string $id){
        $id = 
        // $acc = Account::where(Account::ID_FIELD, $id)->take(1);
        $acc = Account::fromId($id);
        
        if($acc === null){
            throw new HttpException(
                "Email não encontrado",
                11,
                404
            );
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
        
        $acc->fill($data);
        $acc->save();

        return $acc;
    }
    protected function delete($id){}
    
}