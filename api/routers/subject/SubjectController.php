<?php
namespace App\routers\subject;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\subject\Subject;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class SubjectController extends BaseRestController {
    public const MODEL = Subject::class;
 
    public function _404(string $field = 'id'){
        parent::_404($field);
    } 
}