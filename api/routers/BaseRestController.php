<?php
namespace App\routers;

use \Slim\Http\Request;
use \Slim\Http\Response;
use \App\exceptions\HttpException;
use \Illuminate\Database\QueryException;

abstract class BaseRestController{
    public const STATUS_CODE = [
        'ok' => 200,
        'created' => 201,
        'metodo_invalido' => 405,
        'erro_interno' => 500
    ];
    public const STATUS_MESSAGE = [
        'ok' => 'OK!'
    ];
    public function getAll(Request $request, Response $response, array $args){
        
        $many = $this->readAll();
        
        return $this->makeResponse(
            $response,
            $many->toJson());
    }
    public function getOne(Request $request, Response $response, array $args){
        $id = $request->getAttribute('id');
        
        try{
         
            $one = $this->readOne($id);

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
            $one->toJson()
        );
    }
    public function postAll(Request $request, Response $response, array $args){
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
            $one->toJson(),
            self::STATUS_CODE['created']
        );
    }
    public function postOne(Request $request, Response $response, array $args){
        return $this->makeResponse(
            $response,
            [
                'code' => '00',
                'message' => 'Ação não permitida'
            ],
            self::STATUS_CODE['metodo_invalido']
        );
    }
    public function putAll(Request $request, Response $response, array $args){
        return $this->makeResponse(
            $response,
            [
                'code' => '00',
                'message' => 'Ação não permitida'
            ],
            self::STATUS_CODE['metodo_invalido']
        );
    }
    public function putOne(Request $request, Response $response, array $args){
        $data = $request->getParsedBody();
        
        $id = $request->getAttribute('id');
        
        try{
            
            $one  = $this->update($id, $data);

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
            $one->toJson(),
            self::STATUS_CODE['created']
        );
    }
    public function deleteAll(Request $request, Response $response, array $args){
        return $this->makeResponse(
            $response,
            [
                'code' => '00',
                'message' => 'Ação não permitida'
            ],
            self::STATUS_CODE['metodo_invalido']
        );
    }
    public function deleteOne(Request $request, Response $response, array $args){
        $id = $request->getAttribute('id');
        
        try{
         
            $one = $this->readOne($id);
            $one->delete();

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
            $one->toJson()
        );
    }
    public function makeResponse(Response $response, $json, int $status = 200){
        return $response
            ->withStatus($status)
            ->withJson($json);
    }
    public abstract function readOne(string $id);
    public abstract function readAll();
    public abstract function create(array $data);
    public abstract function update($id, array $data);
    public abstract function delete($id);
    
}