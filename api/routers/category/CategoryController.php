<?php
namespace App\routers\category;
use \Slim\Http\Request;
use \Slim\Http\Response;

use \App\models\category\Category;
use \App\routers\BaseRestController;
use \App\exceptions\HttpException;

class CategoryController extends BaseRestController {
    public const MODEL = Category::class;
}