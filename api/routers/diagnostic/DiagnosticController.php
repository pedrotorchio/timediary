<?php
namespace App\routers\diagnostic;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\diagnostic\Diagnostic;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class DiagnosticController extends BaseRestController {
    public const MODEL = Diagnostic::class;

    
    public function _404(string $field = 'Id'){
        parent::_404($field);
    }
}