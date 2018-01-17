<?php
namespace App\routers;

use \Slim\Http\Request;
use \Slim\Http\Response;
use \App\exceptions\HttpException;
use \Illuminate\Database\QueryException;
use \App\routers\BaseController;

abstract class BaseRestController extends BaseController{
    public const STATUS_CODE = [
        'ok' => 200,
        'created' => 201,
        'invalid_method' => 405,
        'not_found' => 404,
        'erro_interno' => 500
    ];

    public function getAll(Request $request, Response $response, array $args){
        $params = $request->getQueryParams();
        extract($this->extractQueryParameters($params));

        $many = $this->readAll($conditions, $columns);
        
        return $this->makeResponse(
            $response,
            $many);
    }
    public function getOne(Request $request, Response $response, array $args){
        $params = $request->getQueryParams();
        extract($this->extractQueryParameters($params));

        $id = $request->getAttribute('id');
        $relation = $request->getAttribute('relation');
        
        try{

            if($relation){
                $one = $this->readRelation($id, $relation, $conditions, $columns);
                
                return $this->makeResponse(
                    $response,
                    $one[$relation]
                );
            }
         
            $one = $this->readOne($id, $conditions, $columns);
            
            if($one === null)
                $this->_404();
            

        }catch(HttpException $e){
            
            return $this->makeResponse(
                $response,
                [
                    'code' => $e->getCode(),
                    'message' => $e->getMessage(),                     
                    'data' => $e->getData()
                ],
                $e->getHttpStatusCode());
        }catch(QueryException $e){
            return $this->makeResponse(
                $response,
                [
                    'code' => $e->getCode(),
                    'message' => $e->getMessage()
                ],
                self::STATUS_CODE['erro_interno']);
                
                
        }

        return $this->makeResponse(
            $response,
            $one
        );
    }
    public function postAll(Request $request, Response $response, array $args){
        
        $params = $request->getQueryParams();
        extract($this->extractQueryParameters($params));
        $data = $request->getParsedBody();
        try{

            $one  = $this->create($data);

        }catch(HttpException $e){

            return $this->makeResponse(
                $response,
                [
                    'code' => $e->getCode(),
                    'message' => $e->getMessage(),
                    'data' => $e->getData()
                ],
                $e->getHttpStatusCode());
        }catch(QueryException $e){
            return $this->makeResponse(
                $response,
                [
                    'code' => $e->getCode(),
                    'message' => $e->getMessage()
                ],
                self::STATUS_CODE['erro_interno']);
                
        }

        return $this->makeResponse(
            $response,
            $one,
            self::STATUS_CODE['created']
        );
    }
    public function postOne(Request $request, Response $response, array $args){
        
        return $this->_405();

    }
    public function putAll(Request $request, Response $response, array $args){
        return $this->_405();

    }
    public function putOne(Request $request, Response $response, array $args){
        $params = $request->getQueryParams();
        extract($this->extractQueryParameters($params));
        
        $data = $request->getParsedBody();
        $id = $request->getAttribute('id');
        $relation = $request->getAttribute('relation');

        if($relation){
            $one = $this->readOne($id, [], ['*']);
            
            call_user_func([$one, $relation])->attach($data[$relation]);
            
            return $this->makeResponse(
                $response,
                $one
            );
        }
        
        try{
            
            $one  = $this->update($id, $data);
            if($one == null)
                $this->_404();

        }catch(HttpException $e){

            return $this->makeResponse(
                $response,
                [
                    'code' => $e->getCode(),
                    'message' => $e->getMessage(),                     
                    'data' => $e->getData()
                ],
                $e->getHttpStatusCode());
        
        }catch(QueryException $e){
            return $this->makeResponse(
                $response,
                [
                    'code' => $e->getCode(),
                    'message' => $e->getMessage()
                ],
                self::STATUS_CODE['erro_interno']);

        }

        return $this->makeResponse(
            $response,
            $one,
            self::STATUS_CODE['created']
        );
    }
    public function deleteAll(Request $request, Response $response, array $args){
        return $this->_405();

    }
    public function deleteOne(Request $request, Response $response, array $args){
        $params = $request->getQueryParams();
        extract($this->extractQueryParameters($params));
        
        $data = $request->getParsedBody();
        $id = $request->getAttribute('id');
        $relation = $request->getAttribute('relation');

        if($relation){
            
            $one = $this->readOne($id, [], ['*']);
            
            call_user_func([$one, $relation])->detach($data[$relation]);
            
            return $this->makeResponse(
                $response,
                $one
            );
        }
        try{
         
            $this->delete($id);

        }catch(HttpException $e){
            
            return $this->makeResponse(
                $response,
                [
                    'code' => $e->getCode(),
                    'message' => $e->getMessage(),                     
                    'data' => $e->getData()
                ],
                $e->getHttpStatusCode());

        }catch(QueryException $e){
            return $this->makeResponse(
                $response,
                [
                    'code' => $e->getCode(),
                    'message' => $e->getMessage()
                ],
                self::STATUS_CODE['erro_interno']);

        }

        
        return $this->makeResponse(
            $response,
            $one
        );
    }
    public function makeResponse(Response $response, $json, int $status = 200){
        
        return $response
            ->withStatus($status)
            ->withJson($json);
    }


    protected function extractQueryParameters($params){
        $conditions = $params['conditions']?: ['status:=1'];
        $columns    = $params['columns']?: '*';
        $relConditions = $params['relation_conditions']?: ['status:=1'];
        
        $columns = explode(',', $columns);
        
        $conditions2 = [];
        foreach($conditions as $string){
            $condition = explode(':=', $string);
            $conditions2[$condition[0]] = $condition[1];
        }
        
        return [
            'conditions' => $conditions2,
            'columns' => $columns
        ];
    }

    protected function _405(string $method = ''){
        throw new HttpException(
            'Ação não permitida' . (empty($method)? ": {$method}" : ''),
            00,
            self::STATUS_CODE['invalid_method']
        );
    }
    protected function _404(string $field){
        throw new HttpException(
            "{$field} não encontrado",
            21,
            self::STATUS_CODE['not_found']
        );
    }

    
}