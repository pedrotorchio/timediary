<?php
namespace App\routers\activity;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\activity\Activity;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class ActivityController extends BaseRestController {
    public const MODEL = Activity::class;
}