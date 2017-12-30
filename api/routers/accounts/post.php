<?php

use Slim\Http\Request;
use Slim\Http\Response;

use App\models\Account;


$app->post('/accounts', function (Request $request, Response $response, array $args){
    // system, manager create
    // 201 created, 409 already exists
    $data = $request->getParsedBody();
    
    if(Account::exists($data['pers_email']))
        return $response
            ->withStatus(201)
            ->withJson(json_encode([
                'code' => 101,
                'message'=> 'Email já cadastrado'
            ]));

    $acc = new Account($data);
    $acc->save();
    
    return $response
        ->withStatus(201)
        ->withHeader('location', '/accounts/{email}')
        ->withJson($acc->toJson());
});

// 409 Not allowed
$app->post('/accounts/{accounts}', function (Request $request, Response $response, array $args){
    // system, manager create
    // 409 method not allowed
    return $response
        ->withStatus(405)
        ->withJson(json_encode([
            'code' => 103,
            'message' => 'Ação não permitida'
        ]));;
});