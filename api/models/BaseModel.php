<?php
namespace App\models;

use Illuminate\Database\Eloquent\Model;
use \App\models\validators\ValitronValidator as Validator;
use \App\models\account\Account;

abstract class BaseModel extends Model{

    
    public function __construct(array $data = array()){

        $this->table = static::TABLE ?: null;

        parent::__construct($data);
    }
    
    protected $guarded = [
        'id'
    ];
    protected $table = null;
    protected $relationshipFields;
    public function disable(){
        $this->status = 0;
        $this->save();
    }
    public function enable(){
        $this->status = 1;
        $this->save();        
    }
    public static function getRelFields(){
        $fields = ['root'];
        if(defined('static::RELATIONSHIP_FIELDS') && static::RELATIONSHIP_FIELDS !== null)
            $fields = array_merge($fields, static::RELATIONSHIP_FIELDS);

        return $fields;
    }
    public static function getFields(){
        $fields = [
            'status' => '',
            'root' => '',        
            'id' => ''
        ];

        

        if(defined('static::FIELDS') && static::FIELDS !== null)
            $fields = array_merge($fields, static::FIELDS);
            
        return $fields;
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
    protected static function conditionalRelations($relations){
        $relationsWithStatus = [];
        foreach($relations as $field){
            $relationsWithStatus[$field] = function($query){
                $query->where('status', 1);
            };
        }

        return $relationsWithStatus;
    }
    public static function getAll(array $columns = ['*'], $relations = []){
        $relations = self::conditionalRelations($relations);
        $results = self::with($relations)->where('status', 1)->get($columns);
        
        return $results;
    }
    
    public static function fromId($id, array $columns = ['*'], $relations = []){
        
        // $results = self::where(static::ID_FIELD, $id)->take(1);
        $relations = self::conditionalRelations($relations);        
        $id_field = self::idField($id);
        $results = self::with($relations)->where($id_field, $id)->where('status', 1)->take(1);
        
        if($results->count() < 1)
            return null;
        
        return $results->first($columns);
    }
    protected static function idField($id){
        if(is_numeric($id))
            $id_field = 'id';
        else
            $id_field = static::ID_FIELD;

        return $id_field;
    }
    public function fill(array $data){
        
        $validator = (new Validator())->setRules(self::getFields()); 
        $fields = self::getFields();

        $relFields = self::getRelFields();
        foreach($relFields as $field){
            if(isset($data[$field])){
                call_user_func([$this, $field])->attach($data[$field]);
                // $this->subjects()->attach($data['subjects']);
                unset($data[$field]);
            }
        }

        foreach($data as $field => $value){
            if(!isset($fields[$field])){
                unset($data[$field]);
            }
        }
        
        if($validator !== null){
            
            $validator->setData($data);
            $validator->validate();            
        }
            
        parent::fill($data);
    }
    public function root(){
        return $this->belongsTo(Account::class, 'root');
    }
        
}