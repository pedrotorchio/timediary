<?php
return [
    'settings' => [
        'db' => [
            'driver'    => 'mysql',
            'port'      =>  3306,
            'database'  => 'timediary',
            'host'      => 'localhost',
            'username'  => 'pedro',
            'password'  => 'viennerocks',
            'charset'   => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix'    => ''
        ],

        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
        'routers' => [
            'account' => 'AccountController',
            'subject' => 'SubjectController',
            'diagnostic' => 'DiagnosticController'
        ]
    ]
];
