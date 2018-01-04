<?php
namespace App\routers\category;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\category\Category;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class CategoryController extends BaseRestController {
    
    protected function readOne(string $id){
        $acc = Category::fromId($id);
        
        if($acc === null){
            $this->_404();
        }

        return $acc;
    }
    protected function readAll(){
        return Category::all();
    }
    protected function create(array $data){
        $acc = new Category($data);
        $acc->save();

        return $acc;
    }
    protected function update($id, array $data){
        $acc = Category::fromId($id);
        
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