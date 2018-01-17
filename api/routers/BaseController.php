<?php namespace App\routers;

abstract class BaseController{
    public function readRelation($id, $relation, $conditions = null, $columns = null){
        $one = self::modelCall('getRelationship', [$id, $relation, $conditions, $columns]);

        return $one;
    }
    public function readOne($id, $conditions = null, $columns = null){
        
        $one = self::modelCall('fromId', [$id, $conditions, $columns]);
        
        return $one;
    }
    public function readAll($conditions = null, $columns = null){

        return self::modelCall('getAll', [$conditions, $columns]);
    }
    public function create(array $data){
        $data = $this->preFillData($data);
        $model = static::MODEL;
        $one = new $model($data);
        $one->save();

        return $one;
    }
    public function update($id, array $data = []){
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
    protected static function getModel(){
        return static::MODEL;
    }

    public function preFillData($data = []){return $data;}
}