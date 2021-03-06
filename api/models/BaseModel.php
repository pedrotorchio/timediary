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
    
    
    protected static function applyConditions($builder, $conditions){
        
        foreach($conditions as $column => $value){
            
            if($value == null || strtoupper($value) ==  'NULL')
                $builder->whereNull($column);
            else
                $builder->where($column, $value);            
        }
        
        return $builder;
    }
    protected static function makeNewRelationQuery($relation, $conditions, $columns){
        $table = static::RELATIONSHIP_FIELDS[$relation];
        
        foreach($columns as &$column){
            $column = "{$table}.{$column}";
        }
        
        $relationA[$relation] = function ($query) use ($conditions, $columns){
            $query->select($columns);
            foreach($conditions as $column => $value)
                $query->where($column, $value);
        };
        
        return self::with($relationA);
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
    
    
    public static function getRelationship($id, $relation, $conditions, $columns){
        
        $conditions = $conditions;
        $columns = $columns?: ['*'];
        
        $results = self::makeNewRelationQuery($relation, $conditions, $columns);
        
        $id_field = self::idField($id);
        $results->where($id_field, $id);
        $results = $results->first();

        return $results;
    }

    public static function getAll($conditions, $columns){
        $columns = $columns?: ['*'];

        $relations = self::relations();        
        
        $results = self::with($relations);

        $results = self::applyConditions($results, $conditions);
        
        return $results->get($columns);
    }
    
    public static function fromId($id, $conditions, $columns){
        
        $conditions = $conditions;
        $columns = $columns?: ['*'];

        $id_field = self::idField($id);
        $relations = self::relations();
        
        $results = self::with($relations);

        $results->where($id_field, $id);
        $results = self::applyConditions($results, $conditions);
       
        $results->take(1);

        if($results->count() < 1)
            return null;
        
        return $results->first($columns);
    }



    protected static function relations(){
        $fields = [];
        if(defined('static::RELATIONSHIP_FIELDS'))
            $fields = static::RELATIONSHIP_FIELDS;

        return array_keys($fields);
    }
    protected static function idField($id){
        if(is_numeric($id))
            $id_field = 'id';
        else
            $id_field = static::ID_FIELD;

        return $id_field;
    }
    public function fill(array $data){
        
        $fields = self::getFields();

        foreach($data as $field => $value){
            if(!isset($fields[$field])){
                unset($data[$field]);
            }
        }
        
        // $data = $this->validate($data);
            
        parent::fill($data);
    }
    public function validate($data){
        $validator = (new Validator())->setRules(self::getFields()); 
        
        if($validator !== null){
            
            $validator->setData($data);
            $validator->validate();            
        }

        return $data;
    }
    public function root(){
        return $this->belongsTo(Account::class, 'root');
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
        
}