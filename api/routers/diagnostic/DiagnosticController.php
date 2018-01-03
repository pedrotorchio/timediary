<?php
namespace App\routers\diagnostic;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\diagnostic\Diagnostic;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class DiagnosticController extends BaseRestController {
    
    protected function readOne(string $id){
        $acc = Diagnostic::fromId($id);
        
        if($acc === null){
            $this->_404();
        }

        return $acc;
    }
    protected function readAll(){
        return Diagnostic::all();
    }
    protected function create(array $data){
        $acc = new Diagnostic($data);
        $acc->save();

        return $acc;
    }
    protected function update($id, array $data){
        $acc = Diagnostic::fromId($id);
        
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
            "Diagnóstico não encontrado",
            21,
            404
        ))->setData([Diagnostic::ID_FIELD=>'Diagnóstico não encontrado']);
    }
}