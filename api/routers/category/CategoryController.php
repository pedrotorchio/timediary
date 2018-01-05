<?php
namespace App\routers\category;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\category\Category;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class CategoryController extends BaseRestController {
    
    public function readOne(string $id){
        $acc = Category::fromId($id);
        
        if($acc === null){
            $this->_404();
        }

        return $acc;
    }
    public function readAll(){
        return Category::all();
    }
    public function create(array $data){
        $acc = new Category($data);
        $acc->save();

        return $acc;
    }
    public function update($id, array $data){
        $acc = Category::fromId($id);
        
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