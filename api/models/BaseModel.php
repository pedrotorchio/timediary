<?php
namespace App\models;

use Illuminate\Database\Eloquent\Model;
use \App\models\validators\ValitronValidator;

abstract class BaseModel extends Model{


    public function __construct(array $data = array()){
        parent::__construct($data);
        $this->table = static::TABLE ?: null;
    }
    
    protected $guarded = [
        'id'
    ];
    protected $table = null;
    protected $validator = null;

    public function disable(){
        $this->status = 0;
        $this->save();
    }
    public function enable(){
        $this->status = 1;
        $this->save();        
    }

    public static function exists($id){

        $acc = self::fromId($id);
        
        return $acc !== null;

    }
    public static function count($where = null){
        $count = 0;
        $results = self::all();
        $count = $results->count();

        return $count;
    }

    public static function fromId($id){
        $results = self::where(static::ID_FIELD, $id)->take(1);
        
        if($results->count() < 1)
            return null;

        return $results->first();
    }

    public function fill(array $data){
        if($this->validator !== null){
            $this->validator->setData($data);
            $this->validator->validate();            
        }
            
        parent::fill($data);
    }
}