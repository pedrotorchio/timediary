<?php
namespace App\routers\activity;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\activity\Activity;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class ActivityController extends BaseRestController {
    
    protected function readOne(string $id){
        $acc = Activity::fromId($id);
        
        if($acc === null){
            $this->_404();
        }

        return $acc;
    }
    protected function readAll(){
        return Activity::all();
    }
    protected function create(array $data){
        $acc = new Activity($data);
        $acc->save();

        return $acc;
    }
    protected function update($id, array $data){
        $acc = Activity::fromId($id);
        
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
                "Atividade não encontrada",
                21,
                404
            ));
        }
}