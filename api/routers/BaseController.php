<?php namespace App\routers;

abstract class BaseController{
    
    public function readOne(string $id, array $fields = ['*'], array $relations = []){
        
        $acc = self::modelCall('fromId', [$id, $fields, $relations]);
        
        if($acc === null){
            $this->_404();
        }
        return $acc;
    }
    public function readAll(array $fields = ['*'], array $relations = []){
        return self::modelCall('all', [$fields, $relations]);
    }
    public function create(array $data){
        $data = $this->preFillData($data);
        
        $acc = new Account($data);
        $acc->save();

        return $acc;
    }
    public function update($id, array $data){
        $data = $this->preFillData($data);

        $acc = Account::fromId($id);

        
        if($acc === null){
            $this->_404();
        }
        
        $acc->fill($data);
        $acc->save();
        
        return $acc;
    }
    protected static function modelCall(string $method, array $parameters = []){
        return call_user_func_array(static::MODEL.'::'.$method, $parameters);
    }
    public function delete($id){return null;}

    public function preFillData($data = []){return $data;}
}