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
    $APP->get("/{$key}/{id}[/{relation}]", "{$controller}:getOne");
    $APP->post("/{$key}", "{$controller}:postAll");
    $APP->post("/{$key}/{id}[/{relation}]", "{$controller}:postOne");
    $APP->put("/{$key}", "{$controller}:putAll");
    $APP->put("/{$key}/{id}[/{relation}]", "{$controller}:putOne");
    $APP->delete("/{$key}", "{$controller}:deleteAll");
    $APP->delete("/{$key}/{id}[/{relation}]", "{$controller}:deleteOne");
}
