<?php
namespace App\routers\task;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\task\Task;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class TaskController extends BaseRestController {
    
    public function readOne(string $id){
        $acc = Task::fromId($id);
        
        if($acc === null){
            $this->_404();
        }

        return $acc;
    }
    public function readAll(){
        return Task::all();
    }
    public function create(array $data){
        $acc = new Task($data);
        $acc->save();

        return $acc;
    }
    public function update($id, array $data){
        $acc = Task::fromId($id);
        
        if($acc === null){
            $this->_404();
        }

        $acc->fill($data);
        $acc->save();

        return $acc;
    }
    public function delete($id){}
    public function _404(){
        throw (new HttpException(
            "Categoria não encontrada",
            21,
            404
        ));
    }
}