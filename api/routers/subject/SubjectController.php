<?php
namespace App\routers\subject;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\subject\Subject;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class SubjectController extends BaseRestController {
    
    protected function readOne(string $id){
        $acc = Subject::fromId($id);
        
        if($acc === null){
            $this->_404();
        }

        return $acc;
    }
    protected function readAll(){
        return Subject::all();
    }
    protected function create(array $data){
        $acc = new Subject($data);
        $acc->save();

        return $acc;
    }
    protected function update($id, array $data){
        $acc = Subject::fromId($id);
        
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
            "Sujeito não encontrado",
            21,
            404
        ))->setData([Subject::ID_FIELD=>'Sujeito não encontrado']);
    }
}