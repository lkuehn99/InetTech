<?php
/**
 * SLIM Beispiel
 * @version 1.0.0
 */

require_once '../vendor/autoload.php';
$config = ['settings' => [
    'displayErrorDetails' => true,
]];

$app = new Slim\App();

$app->GET('/', function ($request, $response, $args) {
    $response->write("<h1>Welcome to the REST-Slim-Project of WIWS-18ii!<h1>");
    return $response;
});

$app->GET('/hello', function ($request, $response, $args) {
    $response->write("<h2>A warm 'Hello!' from Slim!</h2>");
    return $response;
});

$app->GET('/hello/{name}', function ($request, $response, $args) {
    $response->write("<h2>Hello " . $args['name'] . ", how do you do?</h2>");
    return $response;
});

$route = $app->getContainer()->get('request')->getUri()->getPath();

$app->run();
