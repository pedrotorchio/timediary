<?php

use Slim\Http\Request;
use Slim\Http\Response;

use App\models\Account;

$app->put('/accounts/{account}', function (Request $request, Response $response, array $args){
    // system, manager, user
    // 200 ok, 404 not fount
    
    $accs = Account::where('pers_email', $request->getAttribute('account'));
    
    if(!(count($accs) > 0))
        return $response
            ->withStatus(404)
            ->withJson(json_encode([
                'code' => 102,
                'message' => 'Conta não encontrada'
            ]));
    
    $acc  = $accs->first();
    $data = $request->getParsedBody();

    $acc->massiveSet($data);
    $acc->save();
    
    return $response
        ->withStatus(200)
        ->withJson($acc->toJson());
});


$app->put('/accounts', function (Request $request, Response $response, array $args){
    // system, manager, user
    // 405 method not allowed
    return $response
        ->withStatus(405)
        ->withJson(json_encode([
            'code' => 103,
            'message' => 'Ação não permitida'
        ]));;
});