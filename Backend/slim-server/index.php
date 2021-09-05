<?php
/**
 * Protokoll Verwaltung
 * @version 1.0.0
 */

require_once __DIR__ . '/../vendor/autoload.php';
include 'config/config.php';
$app = new Slim\App();

use \Firebase\JWT\JWT;
  
  // Hash a given Password with or without salt
 $app->GET('/Password', function($request, $oldResponse, $args) {
			$body = $request->getParsedBody();
			$password = $body['password'];		
			$salt = $body['salt'];
			if($salt != null && strlen($salt)!=0){
			$data = password_hash($password, PASSWORD_ARGON2I, array("cost" => 7, "salt" => $salt));
			}else{
			$data = password_hash($password, PASSWORD_ARGON2I);
			}
			$newResponse = $oldResponse->withJson($data);
			return $newResponse;
 });
 
 /**
 * PUT Absence
 * Notes: 
 * Input: Lecture Name and Modul ID for which the students wants to excuse himself, JWT Token. 
 * Summary: Add absence for user for the given event and updates all record keeper entries accordingly.
 * Output: Respone Text
 * Error codes: 
 * 400 - JWT Token Missing; Given User not Record Keeper for given event; not currently the day of 
 * the event;
 * 403 - faulty JWT Token 
 * 500 - No Database Entry for given Username;  Database Error while Upadating Record Keepers
 * 200 - Success
 */
 
$app->PUT('/Calendar/Absence', function($request, $oldResponse, $args) {
            
			// JWT Token Verification
			if(!$request->hasHeader('api-jwt')) {
				$res['status'] = "error";
				$res['message'] = utf8_encode("Auth failed - API token missing.");
				$newResponse = $oldResponse->withStatus(400)->withHeader('Content-Type','application/json');
				$newResponse->write(json_encode($res));
				return $newResponse;
			} else {
				$apiTokenJWT = $request->getHeader('api-jwt')[0];
				$result = JWT_check_token($apiTokenJWT);
				if($result['status'] == 'error') {
					$res['status'] = 'error';
					$res['message'] = $result['message'];
					$newResponse = $oldResponse->withStatus(403)->withHeader('Content-Type','application/json');
					$newResponse->write(json_encode($res));
					return $newResponse;
				}
			}

            $lectureList = array();
			$userList = array();
            $queryParams = $request->getQueryParams();
            $username = $queryParams['username'];    
			$con = establish_dbcon();
			$sql="select * from Benutzer where `benutzername`='$username'";
            $result = mysqli_query($con,$sql);
            $row = mysqli_fetch_assoc($result);
			
			// Return Error in case username exists zero or several times in database
			if(mysqli_num_rows($result)!=1){
				$data = array('Errortext' => 'Inambigious User Database Entrys');
				$newResponse = $oldResponse->withJson($data, 500);
				return $newResponse;
			}
			
			// Check if theres an Event for the given Module for which the user is the record keeper, if not return an error
			$idStudiengruppe= $row['ID_Studiengruppe'];
			$moduleEventID = $queryParams['moduleEventID'];
			$sql = "SELECT * FROM Benutzer JOIN Vorlesungen ON `Prot` = `Benutzername` WHERE `Prot` = '$username' AND `ID_Vorlesung` = '$moduleEventID'";
			$result = mysqli_query($con,$sql);
            $row = mysqli_fetch_assoc($result);

			if(mysqli_num_rows($result)==0){
				$con->close();
				$data = array('Errortext' => 'Given User not record keeper for given Lecture');
				$newResponse = $oldResponse->withJson($data, 400);
				return $newResponse;
			}
			// check if the given lecture is today, if not return an error
			$startTime = utf8_encode($row['Beginn']); 
			$startTimestamp = strtotime($startTime);
			$date = date('d-m-Y', $startTimestamp);
			$dateToday = date('d-m-Y', time());
			
			if(strcmp($date, $dateToday)!=0){
				$con->close();
				$data = array('Errortext' => 'You can only submit your absence on the day of the lecture');
				$newResponse = $oldResponse->withJson($data, 400);
				return $newResponse;
			}
			// Create an ordered List of Users for the given Module
			$sql = "SELECT * FROM Benutzer Where `ID_Studiengruppe` = (SELECT ID_Studiengruppe from Benutzer WHERE `Benutzername` = '$username') order by nachname";
			$result = mysqli_query($con,$sql);
			while ($row = mysqli_fetch_array($result)) {
				$currUser = $row['Benutzername'];
				array_push($userList, $currUser);
            }

			// Create an ordered List of Lectures for which new Record Keepers will have to be assigned
			$sqlLectureList = "SELECT * From Vorlesungen JOIN hat  ON Vorlesungen.`ID_Hat` = hat.`ID_Hat` WHERE hat.`ID_Studiengruppe` = '$idStudiengruppe' order by Vorlesungen.`Beginn`";
			$resultLectureList = mysqli_query($con,$sqlLectureList);
			
			while ($rowLectureList = mysqli_fetch_array($resultLectureList)) {
			$idModule= $rowLectureList['ID_Vorlesung'];
			array_push($lectureList, $idModule);
			}

			$key = array_search($moduleEventID, $lectureList);
			$pos = array_search($key, array_keys($lectureList));
			
			// remove Events which took place in the past 
			if($pos > 0) {
				$lectureList= array_slice($lectureList,$pos,count($lectureList),false);
			}
			
			$key = array_search($username, $userList);
			$pos = array_search($key, array_keys($userList));
			$countUserList = count($userList);
			
			// iterate through users and assign a new record keeper for each event in the previously created list
			for($i = 0; $i < count($lectureList); $i++){
				
				$pos += 1;
				if($pos >= $countUserList){
					$pos = 0;
				}

				$nextProt = $userList[$pos];
				$sql = "UPDATE Vorlesungen SET `Prot` = '$nextProt' where `ID_Vorlesung` = '$lectureList[$i]'";
				$sqlTrans = "START TRANSACTION;";
				mysqli_query($con,$sqlTrans);
				if(mysqli_query($con,$sql) === false){
					$sqlTrans = "ROLLBACK;";
					mysqli_query($con,$sqlTrans);
					$con->close();
					$data = array('Errortext' => 'Error when updating lectures');
					$newResponse = $oldResponse->withJson($data, 500);
					return $newResponse;
				}
				$sqlTrans = "COMMIT;";	
				mysqli_query($con,$sqlTrans);

			}
			
			$con->close();
			$data = array('Text' => 'Absence successfully processed');
			$newResponse = $oldResponse->withJson($data, 200);
			return $newResponse;
            });


/**
 * GET Calendar
 * Notes: 
 * Input: User for which Info should be returned, JWT-Token
 * Summary: Return a List of all Events which the given User will have to attend. 
 * Output: List of events, each including the module Name, a start time, end time and the record keeper. 
 * Error Codes: 
 * 400 - JWT Token Missing 
 * 403 - faulty JWT Token 
 * 200 - Success
 */
$app->GET('/Calendar', function($request, $oldResponse, $args) {

			// JWT Token Verification
			if(!$request->hasHeader('api-jwt')) {
				$res['status'] = "error";
				$res['message'] = utf8_encode("Auth failed - API token missing.");
				$newResponse = $oldResponse->withStatus(400)->withHeader('Content-Type','application/json');
				$newResponse->write(json_encode($res));
				return $newResponse;
			} else {
				$apiTokenJWT = $request->getHeader('api-jwt')[0];
				$result = JWT_check_token($apiTokenJWT);
				if($result['status'] == 'error') {
					$res['status'] = 'error';
					$res['message'] = $result['message'];
					$newResponse = $oldResponse->withStatus(403)->withHeader('Content-Type','application/json');
					$newResponse->write(json_encode($res));
					return $newResponse;
				}
			}


            $queryParams = $request->getQueryParams();
			
			
           $con = establish_dbcon();
            
			$data = array();
			
			$username = $queryParams['username'];
			$sql = "Select * from Benutzer where `Benutzername`='$username'";
			$result = mysqli_query($con,$sql);
			$row = mysqli_fetch_assoc($result);
			$course=utf8_encode($row['ID_Studiengruppe']);
			
			
			$sqlPrep="select * from hat where `id_studiengruppe`='$course'";
			$resultPrep = mysqli_query($con,$sqlPrep); 
			// get a List of all modules and corresponding data for the given user using his course 
			while ($rowPrep = mysqli_fetch_array($resultPrep)) {
				$hatID = utf8_encode($rowPrep['ID_Hat']);
				$moduleID = utf8_encode($rowPrep['ID_Modul']);
				$sql="select * from Vorlesungen where `ID_Hat`='$hatID'";
				$result = mysqli_query($con,$sql);

				// get Name of corresponding Module to display
				$sqlModuleName = "Select * from Modul where `ID_Modul`='$moduleID'";
				$resultModuleName = mysqli_query($con,$sqlModuleName); 
				$rowModuleName = mysqli_fetch_assoc($resultModuleName);
				
				while ($row = mysqli_fetch_array($result)) {
				// Data to display 
				$id_module = utf8_encode($row['ID_Vorlesung']);
				$moduleName = utf8_encode($rowModuleName['Name']);
				
				$start = utf8_encode($row['Beginn']); 
				$end = utf8_encode($row['Ende']); 
				$protocol = utf8_encode($row['Prot']);
				
				array_push($data, array('ID' => $id_module, 'Modul' => $moduleName, 'Startzeit' => $start, 'Endzeit' => $end, 'Protokollant' => $protocol));
				}
			}
			
            $con->close();
            $newResponse = $oldResponse->withJson($data);
			return $newResponse;
            });
			
/**
 * GET User
 * Notes:
 * Input: User for which Info should be returned, JWT-Token
 * Summary: Get Info about a given User
 * Output: Info about the user including the first and last name, the username, the assigned role aswell as the course
 * Error Codes:
 * 400 - JWT Token Missing 
 * 403 - faulty JWT Token 
 * 500 - User exists several or zero times in the database
 * 200 - Success
 */
$app->GET('/User', function($request, $oldResponse, $args) {
            
			// JWT Token Verification
			if(!$request->hasHeader('api-jwt')) {
				$res['status'] = "error";
				$res['message'] = utf8_encode("Auth failed - API token missing.");
				$newResponse = $oldResponse->withStatus(400)->withHeader('Content-Type','application/json');
				$newResponse->write(json_encode($res));
				return $newResponse;
			} else {
				$apiTokenJWT = $request->getHeader('api-jwt')[0];
				$result = JWT_check_token($apiTokenJWT);
				if($result['status'] == 'error') {
					$res['status'] = 'error';
					$res['message'] = $result['message'];
					$newResponse = $oldResponse->withStatus(403)->withHeader('Content-Type','application/json');
					$newResponse->write(json_encode($res));
					return $newResponse;
				}
			}

            $queryParams = $request->getQueryParams();
            $username = $queryParams['username'];    
            
			$con = establish_dbcon();
            $sql="select * from Benutzer where `benutzername`='$username'";
            $result = mysqli_query($con,$sql);
            $row = mysqli_fetch_assoc($result);
			
			// Case in which user exists several times in database
			if(mysqli_num_rows($result)!=1){
				$con->close();
				$data = array('Errortext' => 'Inambigious User Database Entrys');
				$newResponse = $oldResponse->withJson($data, 500);
				return $newResponse;
			}
			
			// read all available information about the user and return it
            $vorname = utf8_encode($row['Vorname']);
            $nachname = utf8_encode($row['Nachname']);
            $rolle = $row['rolle'];
            $idStudiengruppe= $row['ID_Studiengruppe'];

            $sql="select * from Studiengruppen where `ID_Studiengruppe`='$idStudiengruppe'";
            $resultStudiengruppe = mysqli_query($con,$sql);

            $row = mysqli_fetch_assoc($resultStudiengruppe);
            $nameStudiengruppe = utf8_encode($row['Name']);
            
			$con->close();
			
			$data = array('firstName' => $vorname, 'lastName' => $nachname, 'username' => $username, 'role' => $rolle, 'course' => $nameStudiengruppe);
			
			$newResponse = $oldResponse->withJson($data);
			return $newResponse;
            });


/**
 * POST Login
 * Notes: 
 * Input: Username and Password
 * Summary: Log in to a given User
 * Output: Respone Text
 * Error Codes: 
 * 400 - Given User does not exist
 * 403 - Wrong Password for given User
 * 200 - Success
 */
$app->POST('/User/Login', function($request, $oldResponse, $args) {
            
			$body = $request->getParsedBody();
            $username = $body['username'];	
			$password = $body['password'];			
            
			$con = establish_dbcon();
            $sql="select * from Benutzer where `benutzername`='$username'";
            $result = mysqli_query($con,$sql);
            $row = mysqli_fetch_assoc($result);
			
			if(mysqli_num_rows($result)==0){
				$con->close();
				$data = array('Errortext' => 'Given User does not exist');
				$newResponse = $oldResponse->withJson($data, 400);
				return $newResponse;
			}
			
			$stored_password = utf8_encode($row['Passwort']);
			$con->close();
			// hash password and compare it to the given hash, automatically checks for used hashing method
			if(password_verify($password, $stored_password)) {
			$data = array('Text' => 'Successfully logged in', 'JWT-TOKEN' => JWTTOKEN);
				$newResponse = $oldResponse->withJson($data, 200);
				return $newResponse;
			}else{
				$data = array('Errortext' => 'Wrong Password for given Username');
				$newResponse = $oldResponse->withJson($data, 403);
				return $newResponse;
			}
			
            });


// Check a given JWT Token by decoding it 
function JWT_check_token ($token){
	try{
		$algsAllowed = array(ALGORITHM);
		$decoded = JWT::decode($token, SECRET, $algsAllowed);
		if($decoded->{'sub'} !== APIKEY) {
			$res['status'] = "error";
			$res['message'] = "Wrong Token.";
		} else {
			$res['status'] = "success";
			$res['message'] = "JWT ok";
		}
	}
	catch (Exception $e) {
		$res['status'] = "error";
		$res['message'] = $e->getMessage();
	}
	return $res;
}

// try establishing a database connection
function establish_dbcon(){
	$con = mysqli_connect(DBHOST, DB, DBPW, DBUSER);
            if(!$con) {
                die('Could not connect: ' . mysqli_error($con));
            }

            mysqli_select_db($con,DB);
	return $con;
	
}

$app->run();
