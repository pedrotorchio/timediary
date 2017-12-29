<?php
namespace App\models;

use Illuminate\Database\Eloquent\Model;

abstract class BaseModel extends Model{
    
    protected $guarded = [
        'id'
    ];
    protected $fillable = [];
    
    public function __construct(){
        
    }

    public function disable(){
        $this->status = 0;
    }
    public function enable(){
        $this->status = 1;
    }

    public function massiveSet(array $data){
        foreach($this->fillable as $field){
            if(isset($data[$field]))
                $this->$field = $data[$field];
        }
    }
    public static function exists($id){
        $acc = self::where(static::$idField, '=', $id);
        
        return count($acc) > 0;
    }
    public static function count($where = null){
        $count = 0;
        if($where == null)
            $count = count(self::all());

        return $count;
    }
}