<?php
global $APP;

$routers = $APP->getContainer()->get('settings')['routers'];

foreach($routers as $key => $classname){
    registerController($key, $classname);
    generateRoutes($key, $classname);
}
$APP->options('/{route:.+}', function ($request, $response, $args) {
    
    return $response;
});
$APP->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:8080, *')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

function registerController(string $key , string $className){
    global $APP;
    $classname = "\\App\\routers\\{$key}\\{$className}";
    
    $container = $APP->getContainer();
    $container[$className] = function ($container) use ($classname) {
        return new $classname;
    };
}
function generateRoutes(string $key, string $controller){
    global $APP;
    $APP->get("/{$key}", "{$controller}:getAll");
    $APP->get("/{$key}/{id}", "{$controller}:getOne");
    $APP->post("/{$key}", "{$controller}:postAll");
    $APP->post("/{$key}/{id}", "{$controller}:postOne");
    $APP->put("/{$key}", "{$controller}:putAll");
    $APP->put("/{$key}/{id}", "{$controller}:putOne");
    $APP->delete("/{$key}", "{$controller}:deleteAll");
    $APP->delete("/{$key}/{id}", "{$controller}:deleteOne");
}
