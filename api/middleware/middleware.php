<?php
// Application middleware

// e.g: $app->add(new \Slim\Csrf\Guard);
$APP->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
            ->withHeader('Allow', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});