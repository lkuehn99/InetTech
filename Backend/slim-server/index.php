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
 
$app->PUT('/Backend/test', function($request, $response, $args) {
	 			$baUser = new BAUser();
			$baUser->$firstName = 'vor';
			$baUser->$lastName = 'nach';
			$baUser->$username = 'user';
			//$baUser->$password = "";
			$baUser->$role = 'username';
			$baUser->$course = 'wiws18ii';
			
			$newResponse = $oldResponse->withJson($baUser);
			return $newResponse;
            });
 
$app->PUT('/Calendar/processAbsence', function($request, $response, $args) {
            
            
            $queryParams = $request->getQueryParams();
            $username = $queryParams['username'];    
			//TODO: DBConnection Ausfüllen
            $con = mysqli_connect('host','database','user','password');
            if(!$con) {
                die('Could not connect: ' . mysqli_error($con));
            }

            mysqli_select_db($con,"d02c66a3");
			$sql="select * from Benutzer where `benutzername`='$username'";
            $result = mysqli_query($con,$sql);
            $row = mysqli_fetch_assoc($result);
			
			if(mysqli_num_rows($result)!=1){
				$data = array('Errortext' => 'Inambigious User Database Entrys');
				$newResponse = $oldResponse->withJson($data, 500);
				return $newResponse;
			}
			
			$lectureID = $queryParams['moduleEventID'];
			$sql = "SELECT * FROM Benutzer JOIN Vorlesung ON Prot = Benutzername WHERE Prot = '$username' AND ID_Vorlesung = '$moduleEventID'";
			$result = mysqli_query($con,$sql);
            $row = mysqli_fetch_assoc($result);
			 
			if(mysqli_num_rows($result)==0){
				$data = array('Errortext' => 'Given User not in given Lecture');
				$newResponse = $oldResponse->withJson($data, 500);
				return $newResponse;
			}
			// check if the given lecture is today, if not return an error
			$startTime = utf8_encode($row['Beginn']); 
			$startTimestamp = strtotime($startTime);
			$date = date('d-m-Y', $startTimestamp);
			$dateToday = date('d-m-Y', time());
			
			if(strcmp($date, $dateToday)!=0){
				$data = array('Errortext' => 'You can only submit your absence on the day of the lecture');
				$newResponse = $oldResponse->withJson($data, 500);
				return $newResponse;
			}
			// in Liste
			$sql = SELECT * FROM Benutzer Where ID_Studiengruppe = (SELECT ID_Studiengruppe from Benutzer = '$username') sort by benutzername;
			$result = mysqli_query($con,$sql);
            $row = mysqli_fetch_assoc($result);
			
			
			// weiter bei VorlListe
			
			/*
            Select * from Benuter where benutername = benutername
            if(Benuter nicht vorhanden){
                return Fehlercode "Benuter nicht vorhanden"
            }
            vorlesungsid aus body lesen
            Join auf Benutzer und Vorlesung mit prot = benutzername, benutzer = benutzer und vorlesungsid = vorlesungsid
            if(benutzer nicht in dieser Vorlesung){
                return Fehlercode "Benutzer besucht nicht diese Vorlesung"
            }else if(vorlesung.datum nicht heute){
                return Fehlercode "Man kann sich nur am gleichen Tag entschuldigen"
            }
            reihenfolge = select * from benutzer where ID_Studiengruppe = (select ID_Studiengruppe from benutzer = benutzername) sort by benutzername
            (Das ist die Reihenfolge wie geupdated wird)

            vorlesList = select * from vorlesung, hat where v.ID_Modul = h.ID_Modul and h.ID_Studiengruppe = benutzer.ID_Studiengruppe sort by v.Beginn
            (Liste mit allen Vorlesungen dieser Studiengruppe) 

            vorlesung aus body finden. Alle Elemete der vorlesList vor vorlesung aus body löschen

            werIstGeradeDran = reihenfolge.index von benutzer + 1
            for(int i = 0; i < vorlesList.size, i++) {
                update Vorlesungen set Prot = reihenfolge[werIstGeradeDran++].Benutzername where ID_Vorlesung = vorlesList[i].ID_Vorlesung
                if(werIstGeradeDran >= reihenfolge.length){
                    werIstGeradeDran = 0;
                }
            }
            (Kann lange dauern, sollte wenn möglich asynchron erledigt werden)

            */
            
            $body = $request->getParsedBody();
            $response->write('How about implementing addAbsence as a PUT method ?');
            return $response;
            });


/**
 * GET returnListView
 * Summary: Return list view
 * Notes: 

 */
$app->GET('/Calendar/returnListview', function($request, $oldResponse, $args) {
            
            $queryParams = $request->getQueryParams();
			//ggf. zuerst über username Module ID raussuchen  (Über username in Benutzer Tabelle ID-Studiengruppe)
			
			
			//TODO: Cannot find course in any model, add it!
			$course = $queryParams['course'];
			
			//TODO: DBConnection Ausfüllen
            $con = mysqli_connect('host','database','user','password');
            if(!$con) {
                die('Could not connect: ' . mysqli_error($con));
            }
            
			$data = array();
			mysqli_select_db($con,"d02c66a3");
			$sqlPrep="select * from hat where 'ID_Studiengruppe'='$course'";
			$resultPrep = mysqli_query($con,$sqlPrep); 
			while ($rowPrep = mysql_fetch_array($resultPrep)) {
				$moduleID = utf8_encode($rowPrep['ID_Modul']);
				$sql="select * from Vorlesungen where 'ID_Modul'='$moduleID'";
				$result = mysqli_query($con,$sql);
				$row = mysqli_fetch_assoc($result);
				
				// get Name of corresponding Module to display
				$sqlModuleName = "Select * from Modul where 'ID_Modul'='$moduleID'";
				$resultModuleName = mysqli_query($con,$sqlModuleName); 
				$rowModuleName = mysqli_fetch_assoc($resultModuleName);
				
				// Data to display 
				$moduleName = utf8_encode($rowModuleName['Name']);
				$start = utf8_encode($row['Beginn']); 
				$end = utf8_encode($row['Ende']); 
				$protocol = utf8_encode($row['Prot']);
				
				array_push($data, array('Modul' => '$moduleName', 'Startzeit' => '$start', 'Endzeit' => '$end', 'Protokollant' => '$protocol'))
			}
			
            $con->close();
            $newResponse = $oldResponse->withJson($data);
			return $newResponse;
            });
			
/**
 * GET getUserInfo
 * Summary: Get Info about User
 * Notes: 

 */
$app->GET('/User/getUserInfo', function($request, $oldResponse, $args) {
            
            $queryParams = $request->getQueryParams();
            $username = $queryParams['username'];    
            
            //TODO: DBConnection Ausfüllen
            $con = mysqli_connect('host','database','user','password');
            if(!$con) {
                die('Could not connect: ' . mysqli_error($con));
            }

            mysqli_select_db($con,"d02c66a3");
            $sql="select * from Benutzer where `benutzername`='$username'";
            $result = mysqli_query($con,$sql);
            $row = mysqli_fetch_assoc($result);
			
			// Case in which user exists several times in database
			if(mysqli_num_rows($result)!=1){
				$data = array('Errortext' => 'Inambigious User Database Entrys');
				$newResponse = $oldResponse->withJson($data, 500);
				return $newResponse;
			}
            $vorname = utf8_encode($row['Vorname']);
            $nachname = utf8_encode($row['Nachname']);
            $rolle = $row['rolle'];
            $idStudiengruppe= $row['ID_Studiengruppe'];

            $sql="select * from Studiengruppen where `ID_Studiengruppe`='$idStudiengruppe'";
            $resultStudiengruppe = mysqli_query($con,$sql);

            $row = mysqli_fetch_assoc($resultStudiengruppe);
            $nameStudiengruppe = utf8_encode($row['Name']);
            
            //TODO:Daten in JSON Konvertieren und Prüfen, wenn von SQLs mehr als ein Ergebnis zurückkommt, dann Fehler

			//$data = array('name' => '$nameStudiengruppe', 'age' => 40);
			$con->close();
			$baUser = new BAUser();
			$baUser->$firstName = '$vorname';
			$baUser->$lastName = '$nachname';
			$baUser->$username = '$username';
			//$baUser->$password = "";
			$baUser->$role = '$rolle';
			$baUser->$course = '$nameStudiengruppe';
			
			$newResponse = $oldResponse->withJson($baUser);
			return $newResponse;
            });


/**
 * POST logintoUser
 * Summary: Log in as User
 * Notes: 

 */
$app->POST('/User/login', function($request, $response, $args) {
            
            
            
            $body = $request->getParsedBody();

            /*
            Benutzername aus body auslesen
            Select * from Benuter where benutername = benutername
            if(Benuter nicht vorhanden){
                return Fehlercode "Benuter nicht vorhanden"
            }

            Passwort aus body auslesen
            Passwort hashen (oder schon im Frontend?)
            Passwort aus body mit password aus datenbank vergleichen

            if(Passwörter gleich){
                return Login-Token (oder was auch immer man in php braucht)
            }else {
                return Fehlercode "Passwort nicht richtig"
            }
            */

            $response->write('How about implementing logintoUser as a POST method ?');
            return $response;
            });



$app->run();
