<?php
namespace App\routers\task;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\task\Task;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class TaskController extends BaseRestController {
    
    protected function readOne(string $id){
        $acc = Task::fromId($id);
        
        if($acc === null){
            $this->_404();
        }

        return $acc;
    }
    protected function readAll(){
        return Task::all();
    }
    protected function create(array $data){
        $acc = new Task($data);
        $acc->save();

        return $acc;
    }
    protected function update($id, array $data){
        $acc = Task::fromId($id);
        
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
            "Categoria não encontrada",
            21,
            404
        ));
    }
}