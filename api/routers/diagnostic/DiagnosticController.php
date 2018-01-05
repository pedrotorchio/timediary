<?php
namespace App\routers\diagnostic;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\diagnostic\Diagnostic;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class DiagnosticController extends BaseRestController {
    
    public function readOne(string $id){
        $acc = Diagnostic::fromId($id);
        
        if($acc === null){
            $this->_404();
        }

        return $acc;
    }
    public function readAll(){
        return Diagnostic::all();
    }
    public function create(array $data){
        $acc = new Diagnostic($data);
        $acc->save();

        return $acc;
    }
    public function update($id, array $data){
        $acc = Diagnostic::fromId($id);
        
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
            "Diagnóstico não encontrado",
            21,
            404
        ));
    }
}