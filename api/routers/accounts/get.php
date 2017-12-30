<?php
use Slim\Http\Request;
use Slim\Http\Response;

use App\models\Account;



$app->get('/accounts', function (Request $request, Response $response, array $args) {
    // system read all
    // 200 ok
    $accs = Account::all();    
    return $response
        ->withStatus(200)
        ->withJson($accs->toJson());
    
});
$app->get('/accounts/{account}', function (Request $request, Response $response, array $args) {
    // system, manager, user read one
    // 200 ok, 404 not found
    $accs = Account::where('pers_email', $request->getAttribute('account'));
    var_dump(get_class($accs));die();
    if(count($accs) > 0)
        return $response
            ->withStatus(200)
            ->withJson($accs
                ->first()
                ->toJson());
    
    return $response
        ->withStatus(404)
        ->withJson(json_encode([
            'code' => 102,
            'message' => 'Conta não encontrada'
        ]));
});