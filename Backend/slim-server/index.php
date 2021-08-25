<?php
/**
 * Protokoll Verwaltung
 * @version 1.0.0
 */

require_once __DIR__ . '/vendor/autoload.php';

$app = new Slim\App();


/**
 * PUT addAbsence
 * Summary: Add absence for user
 * Notes: 

 */
$app->PUT('/Calendar/processAbsence', function($request, $response, $args) {
            
            
            
            $body = $request->getParsedBody();
            $response->write('How about implementing addAbsence as a PUT method ?');
            return $response;
            });


/**
 * GET returnListView
 * Summary: Return list view
 * Notes: 

 */
$app->GET('/Calendar/returnListview', function($request, $response, $args) {
            
            
            
            $body = $request->getParsedBody();
            $response->write('How about implementing returnListView as a GET method ?');
            return $response;
            });


/**
 * GET getUserInfo
 * Summary: Get Info about User
 * Notes: 

 */
$app->GET('/User/getUserInfo', function($request, $response, $args) {
            
            $queryParams = $request->getQueryParams();
            $username = $queryParams['username'];    
            
            
            $response->write('How about implementing getUserInfo as a GET method ?');
            return $response;
            });


/**
 * POST logintoUser
 * Summary: Log in as User
 * Notes: 

 */
$app->POST('/User/login', function($request, $response, $args) {
            
            
            
            $body = $request->getParsedBody();
            $response->write('How about implementing logintoUser as a POST method ?');
            return $response;
            });



$app->run();
