<?php
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);


if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $url  = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

require __DIR__ . '/../vendor/autoload.php';

// Instantiate the app
$settings = require __DIR__ . '/../settings.php';
$app = new Slim\App($settings);


// // Set up dependencies
require __DIR__ . '/../services/dependencies.php';

// // Register middleware
require __DIR__ . '/../middleware/middleware.php';

// // Register routes
require __DIR__ . '/../routers/routes.php';

App\bootstrap\Seeder::accountsUpTo(10);

// Run app
$app->run();
