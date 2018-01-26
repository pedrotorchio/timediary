<?php
namespace App\routers\task;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\task\Task;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class TaskController extends BaseRestController {    
    public const MODEL = Task::class;

}