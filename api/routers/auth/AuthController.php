<?php
namespace App\routers\auth;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\routers\account\AccountController;
use \App\exceptions\HttpException;
use \App\services\Authentication;

class AuthController {
    protected $accountController = null;
    // pra fazer testes sem codificar authorization: basic username:password
    protected $encodedAuthorizationHeader = true;
    public function __construct(){
        $this->accountController = new AccountController();
    }

    public function inOrUpOrFail($request, $response){
        
        $auth = $this->extractAuthorizationHeader($request);
        $username = $auth[0];
        $password = $auth[1];
        $method   = $auth[2];
        
        try{
            $acc = $this->login($username, $password);

        }catch(HttpException $e){
            return $this->makeResponse(
                $response,
                [
                    'code' => $e->getCode(),
                    'message' => $e->getMessage(),                     
                    'data' => $e->getData()
                ],
                $e->getHttpStatusCode());
        }     
        
        return $acc;
    }
    public function getAll(Request $request, Response $response, array $args){
        
        $acc = $this->inOrUpOrFail($request, $response);
        
        
        return $this->makeResponse($response, $acc->toJson(), 200);
    }

    public function postAll(Request $request, Response $response, array $args){
        $data = $request->getParsedBody();

        
        $acc = $this->inOrUpOrFail($request, $response);

        $acc->fill($data);
        $acc->save();
        
        
        return $this->makeResponse($response, $acc->toJson(), 200);
    }
    public function getOne(Request $request, Response $response, array $args){
        return $this->_405();
        
    }
    public function postOne(Request $request, Response $response, array $args){
        return $this->_405();
    }
    public function putAll(Request $request, Response $response, array $args){
        return $this->_405();
        
    }
    public function putOne(Request $request, Response $response, array $args){
        return $this->_405();
    
    }
    public function deleteAll(Request $request, Response $response, array $args){
        return $this->_405();
        
    }
    public function deleteOne(Request $request, Response $response, array $args){
        return $this->_405();
       
    }
    public function login($email, $password){
        

        try{
            $acc = $this->accountController->readOne($email);        
        }catch(HttpException $e){
            $acc = $this->accountController->create([
                'pers_email' => $email,
                'password' => $password,
                'grant_type' => 'password',
                'root' => null,
                'role' => 'ROOT' 
            ]);

            return $acc;
        }
        
        if(AccountController::passwordHash($password) != $acc->password){
            
            throw (new HttpException(
                "Email encontrado. Senha errada",
                22,
                401
            ));
            
        }
        
        return $acc;
         
    }
    public function makeResponse(Response $response, $json, int $status = 200){
        
        return $response
            ->withStatus($status)
            ->withJson($json);
    }
    public function extractAuthorizationHeader($request){
        $auth = $request->getHeader('Authorization')[0];
        $parts = explode(' ', $auth);
        $meth = $parts[0]; 
        $auth = $parts[1];
        if($this->encodedAuthorizationHeader)
            $auth = base64_decode($auth);
        $auth = explode(':', $auth);
        $auth[2] = $meth;

        return $auth;
    }
    public function _405(){
        return $this->makeResponse(
            $response,
            [
                'code' => '00',
                'message' => 'Ação não permitida'
            ],
            405
        );
    }
}