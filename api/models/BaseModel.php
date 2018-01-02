<?php
namespace App\models;

use Illuminate\Database\Eloquent\Model;

abstract class BaseModel extends Model{


    public function __construct(){
        $this->table = static::TABLE;
    }
    
    protected $guarded = [
        'id'
    ];
    protected $table = '';

    public function disable(){
        $this->status = 0;
    }
    public function enable(){
        $this->status = 1;
    }

    public function massiveSet(array $data){
        foreach(static::FIELDS as $field){
            if(isset($data[$field]))
                $this->$field = $data[$field];
        }
    }
    public static function exists($id){

        $acc = self::where(static::ID_FIELD, $id)->take(1);
        
        return $acc->count() > 0;

    }
    public static function count($where = null){
        $count = 0;
        if($where == null)
            $count = count(self::all());

        return $count;
    }

    public static function fromId($id){
        $results = self::where(static::ID_FIELD, $id)->take(1);
        
        if($results->count() < 1)
            return null;

        return $results->first();
    }
}