<?php
namespace App\models;

use Illuminate\Database\Eloquent\Model;
use \App\models\validators\ValitronValidator as Validator;
use \App\models\account\Account;

abstract class BaseModel extends Model{


    public function __construct(array $data = array()){
        parent::__construct($data);
        
        $this->table = static::TABLE ?: null;
        $this->validator = (new Validator())->setRules(self::getFields());
    }
    
    protected $guarded = [
        'id'
    ];
    protected $table = null;
    protected $validator = null;
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
            'status' => 'boolean',
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
    public static function all($columns = ['*']){
        
        $fields = self::getRelFields();
        $results = self::with($fields)->get($columns);
        
        return $results;
    }
    public static function fromId($id){
        // $results = self::where(static::ID_FIELD, $id)->take(1);
        
        $fields = self::getRelFields();
        $results = self::with($fields)->where(static::ID_FIELD, $id)->take(1);
        
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
    public function root(){
        return $this->belongsTo(Account::class, 'root');
    }
        
}