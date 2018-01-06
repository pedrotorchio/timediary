<?php namespace App\routers;

abstract class BaseController{
    
    public function readOne(string $id, array $fields = ['*'], array $relations = []){
        
        $one = self::modelCall('fromId', [$id, $fields, $relations]);
        
        return $one;
    }
    public function readAll(array $fields = ['*'], array $relations = []){
        return self::modelCall('all', [$fields, $relations]);
    }
    public function create(array $data){
        $data = $this->preFillData($data);
        $model = static::MODEL;
        $one = new $model($data);
        $one->save();

        return $one;
    }
    public function update($id, array $data){
        $data = $this->preFillData($data);

        $one = $this->readOne($id);
        
        if($one === null)
            return null;
        
        $one->fill($data);
        $one->save();
        
        return $one;
    }
    public function delete($id){
        $one = $this->readOne($id);
        $one->delete();

        return $one;            
    }
    
    protected static function modelCall(string $method, array $parameters = []){
        return call_user_func_array(static::MODEL.'::'.$method, $parameters);
    }
    

    public function preFillData($data = []){return $data;}
}