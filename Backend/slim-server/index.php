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
            
            //TODO: DBConnection Ausfüllen
            $con = mysqli_connect('host','database','user','password');
            if(!$con) {
                die('Could not connect: ' . mysqli_error($con));
            }

            mysqli_select_db($con,"Benutzer");
            $sql="select * from Benutzer where `benutzername`='$username'";
            $result = mysqli_query($con,$sql);

            $row = mysqli_fetch_assoc($result))
            $vorname = utf8_encode($row['Vorname']);
            $nachname = utf8_encode($row['Nachname']);
            $rolle = $row['rolle'];
            $idStudiengruppe= $row['ID_Studiengruppe'];

            mysqli_select_db($con,"Studiengruppen");
            $sql="select * from Studiengruppen where `ID_Studiengruppe`='$idStudiengruppe'";
            $resultStudiengruppe = mysqli_query($con,$sql);

            $row = mysqli_fetch_assoc($resultStudiengruppe))
            $nameStudiengruppe = utf8_encode($row['Name']);
            
            //TODO:Daten in JSON Konvertieren und Prüfen, wenn von SQLs mehr als ein Ergebnis zurückkommt, dann Fehler

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
