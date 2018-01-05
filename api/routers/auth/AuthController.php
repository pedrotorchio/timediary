<?php
namespace App\routers\auth;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\account\Account;
use \App\exceptions\HttpException;

class AuthController {
    public function getAll(Request $request, Response $response, array $args){
        
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
        
        return $this->makeResponse($response, $acc->toJson(), 200);
    }
    public function getOne(Request $request, Response $response, array $args){
        
    }
    public function postAll(Request $request, Response $response, array $args){
        $data = $request->getParsedBody();

        
        $auth = $this->extractAuthorizationHeader();
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
        $acc->fill($data);
        $acc->save();
        
        
        return $this->makeResponse($response, $acc->toJson(), 200);
    }
    public function postOne(Request $request, Response $response, array $args){
        
    }
    public function putAll(Request $request, Response $response, array $args){
        
    }
    public function putOne(Request $request, Response $response, array $args){
    
    }
    public function deleteAll(Request $request, Response $response, array $args){
        
    }
    public function deleteOne(Request $request, Response $response, array $args){
       
    }
    protected function login($email, $password){
        
        $acc = Account::fromId($email);
        
        
        if($acc === null){
            return Account::create([
                'pers_email' => $email,
                'password' => $password,
                'grant_type' => 'password',
                'root' => null,
                'role' => 'ROOT' 
            ]);
        }else if(Account::passwordHash($password) != $acc->password){
            
            throw (new HttpException(
                "Email encontrado. Senha errada",
                22,
                401
            ));
            
        }
        
        return $acc;
         
    }
    protected function makeResponse(Response $response, $json, int $status = 200){
        
        return $response
            ->withStatus($status)
            ->withJson($json);
    }
    protected function extractAuthorizationHeader($request){
        $auth = $request->getHeader('Authorization')[0];
        $parts = explode(' ', $auth);
        $meth = $parts[0]; 
        $auth = $parts[1];
        $auth = base64_decode($auth);
        $auth = explode(':', $auth);
        $auth[2] = $meth;

        return $auth;
    }
}