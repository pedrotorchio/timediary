<?php
namespace App\routers\activity;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\activity\Activity;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class ActivityController extends BaseRestController {
    
    public function readOne(string $id){
        $acc = Activity::fromId($id);
        
        if($acc === null){
            $this->_404();
        }

        return $acc;
    }
    public function readAll(){
        return Activity::all();
    }
    public function create(array $data){
        $acc = new Activity($data);
        $acc->save();

        return $acc;
    }
    public function update($id, array $data){
        $acc = Activity::fromId($id);
        
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
                "Atividade não encontrada",
                21,
                404
            ));
        }
}