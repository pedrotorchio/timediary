<?php
namespace App\routers;

use \Slim\Http\Request;
use \Slim\Http\Response;
use \App\routers\exceptions\HttpException;

abstract class BaseRestController{
    public const STATUS_CODE = [
        'ok' => 200,
        'created' => 201,
        'metodo_invalido' => 405
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
                json_encode([
                    'code' => $e->getCode(),
                    'message' => $e->getMessage()
                ]),
                $e->getHttpStatusCode());
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
                json_encode([
                    'code' => $e->getCode(),
                    'message' => $e->getMessage()
                ]),
                $e->getHttpStatusCode());
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
            json_encode([
                'code' => '00',
                'message' => 'Ação não permitida'
            ]),
            self::STATUS_CODE['metodo_invalido']
        );
    }
    public function putAll(Request $request, Response $response, array $args){
        return $this->makeResponse(
            $response,
            json_encode([
                'code' => '00',
                'message' => 'Ação não permitida'
            ]),
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
                json_encode([
                    'code' => $e->getCode(),
                    'message' => $e->getMessage()
                ]),
                $e->getHttpStatusCode());
        
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
            json_encode([
                'code' => '00',
                'message' => 'Ação não permitida'
            ]),
            self::STATUS_CODE['metodo_invalido']
        );
    }
    public function deleteOne(Request $request, Response $response, array $args){
        $id = $request->getAttribute('id');
        
        try{
         
            $one = $this->readOne($id);

        }catch(HttpException $e){
            
            return $this->makeResponse(
                $response,
                json_encode([
                    'code' => $e->getCode(),
                    'message' => $e->getMessage()
                ]),
                $e->getHttpStatusCode());
        }

        $one->delete();
        return $this->makeResponse(
            $response,
            $one->toJson()
        );
    }
    protected function makeResponse(Response $response, string $json, int $status = 200){
        return $response
            ->withStatus($status)
            ->withJson($json);
    }
    protected abstract function readOne(string $id);
    protected abstract function readAll();
    protected abstract function create(array $data);
    protected abstract function update($id, array $data);
    protected abstract function delete($id);
    
}