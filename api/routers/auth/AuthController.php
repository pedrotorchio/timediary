<?php
namespace App\routers\auth;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\routers\account\AccountController;
use \App\exceptions\HttpException;
use \App\services\Authentication;
use \App\routers\BaseRestController;

class AuthController extends BaseRestController{

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

        $acc = $this->login($username, $password);

        return $acc;
    }
    public function getAll(Request $request, Response $response, array $args){
        try{
            $acc = $this->inOrUpOrFail($request, $response);

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
        $JWT =  Authentication::makeJwt([
            'display_name'=>$acc->display_name,
            'role'=>$acc->role,
            'pers_email'=>$acc->pers_email
        ]);
        
        return $this->makeResponse($response, $JWT, 200);
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
    
    public function extractAuthorizationHeader($request){
        $auth = $request->getHeader('Authorization');
        if(empty($auth))
            throw new HttpException(
                "Autorização ausente",
                00,
                501
            );

        $auth = $auth[0];
        $parts = explode(' ', $auth);
        $meth = $parts[0]; 
        $auth = $parts[1];
        if($this->encodedAuthorizationHeader)
            $auth = base64_decode($auth);
        $auth = explode(':', $auth);
        $auth[2] = $meth;
        
        if(empty($auth[0])){
            throw new HttpException(
                'Username ausente',
                00,
                501
            );
        }
        if(empty($auth[1])){
            throw new HttpException(
                'Senha ausente',
                00,
                501
            );
        }

        return $auth;
        
    }
    
}