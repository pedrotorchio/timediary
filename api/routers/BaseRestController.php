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
        $params = $this->getQueryParameters($request);

        $many = $this->readAll($params['fields'], $params['relationships']);
        
        return $this->makeResponse(
            $response,
            $many);
    }
    public function getOne(Request $request, Response $response, array $args){
        $params = $this->getQueryParameters($request);
        $id = $request->getAttribute('id');
        
        try{
         
            $one = $this->readOne($id, $params['fields'], $params['relationships']);

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
        $params = $this->getQueryParameters($request);
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
        $params = $this->getQueryParameters($request);
        
        $data = $request->getParsedBody();
        
        $id = $request->getAttribute('id');
        
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
        
        $id = $request->getAttribute('id');
        
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


    protected function getQueryParameters(Request $request){
        $params = $request->getQueryParams();
        $params = $this->queryParamsInterpret($params);

        return $params;
    }
    protected function queryParamsInterpret($params = []){
        
        $params['fields'] = isset($params['fields']) ? $this->queryParamList2Array($params['fields']) : ['*'];
        $params['relationships'] = isset($params['relationships']) ? $this->queryParamList2Array($params['relationships']) : [];

        return $params;
    }
    protected function queryParamList2Array($param){
        
        return explode(',', $param);
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