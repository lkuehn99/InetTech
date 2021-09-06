function logintoUser(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var json = JSON.stringify({username: username, password: password});
    var response;
    if (window.XMLHttpRequest)
    {
        // AJAX nutzen mit IE7+, Chrome, Firefox, Safari, Opera
        xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                document.cookie = JSON.stringify({username: document.getElementById("username").value});
                var responseJson = JSON.parse(xmlhttp.responseText);
                document.getElementById("h2").innerHTML = responseJson.Text;
            }else if (xmlhttp.status==405){
                console.log("fehler 400");
            }
        }
    }
    xmlhttp.open("POST","index.php/User/Login",true);
    xmlhttp.setRequestHeader("Authorization", "Basic d2l3czE4aWk6YmFybS13ZWItMjAxOGlp");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader("api-jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlbm5pcyBIZXJybWFubiIsImV4cCI6MTY3NTg3NDQ1N30.xju7pfW3-zDPOVXoztwb2TZMAOH70U9PIPOiKtAYWgs");
    xmlhttp.send(json);
}

function checkLogin(){

    if (document.cookie)
    {
        document.getElementById("h2").innerHTML = "You successfully logged in.";
        document.getElementById("form").style.visibility = "hidden";
        document.getElementById("button1").hidden = true;
        document.getElementById("button2").hidden = false;
    }else{
        document.getElementById("form").hidden = false;
        document.getElementById("button1").hidden = false;
        document.getElementById("button2").hidden = true;
    }
}

function getUserInfo(){
    var cookie = JSON.parse(document.cookie);
    // var json = JSON.stringify({username: cookie.username});
    if (window.XMLHttpRequest)
    {
        // AJAX nutzen mit IE7+, Chrome, Firefox, Safari, Opera
        xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                userInfo = JSON.parse(xmlhttp.responseText);

                document.getElementById("vname").innerHTML = "Vorname: " + userInfo.firstName;
                document.getElementById("nname").innerHTML = "Nachname: " + userInfo.lastName;
                document.getElementById("email").innerHTML = "Username: " + userInfo.username;
                document.getElementById("gruppe").innerHTML = "Kurs: " + userInfo.course;    

            }else if (xmlhttp.status==405){
                window.alert("Invalid input!");
            }
        }
    }
    xmlhttp.open("GET","index.php/User?username="+cookie.username, true);
    xmlhttp.setRequestHeader("Authorization", "Basic d2l3czE4aWk6YmFybS13ZWItMjAxOGlp");
    xmlhttp.setRequestHeader("api-jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlbm5pcyBIZXJybWFubiIsImV4cCI6MTY3NTg3NDQ1N30.xju7pfW3-zDPOVXoztwb2TZMAOH70U9PIPOiKtAYWgs");
    xmlhttp.send();
}

function returnListView(){
    var userData = JSON.parse(document.cookie);
    if (userData.username == null){
        //window.alert('No User logged in!');
    }else{
        //var json = JSON.stringify({username: userData.username, studiengruppeID: 1});
        if (window.XMLHttpRequest)
        {
            // AJAX nutzen mit IE7+, Chrome, Firefox, Safari, Opera
            xmlhttp=new XMLHttpRequest();
        }
        else
        {
            // AJAX mit IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==4){
                if (xmlhttp.status==200){
                    var data = JSON.parse(xmlhttp.responseText);
                    document.getElementById("zelle1").innerText = "ID: " + data[0].ID + " Modul: " + data[0].Modul + " Startzeit: " + data[0].Startzeit + " Endzeit: " + data[0].Endzeit + " Protokollant: " + data[0].Protokollant;
                    document.getElementById("zelle2").innerText = "ID: " + data[1].ID + " Modul: " + data[1].Modul + " Startzeit: " + data[1].Startzeit + " Endzeit: " + data[1].Endzeit + " Protokollant: " + data[1].Protokollant;
                    document.getElementById("zelle3").innerText = "ID: " + data[2].ID + " Modul: " + data[2].Modul + " Startzeit: " + data[2].Startzeit + " Endzeit: " + data[2].Endzeit + " Protokollant: " + data[2].Protokollant;
                    document.getElementById("zelle4").innerText = "ID: " + data[3].ID + " Modul: " + data[3].Modul + " Startzeit: " + data[3].Startzeit + " Endzeit: " + data[3].Endzeit + " Protokollant: " + data[3].Protokollant;
                    document.getElementById("zelle5").innerText = "ID: " + data[4].ID + " Modul: " + data[4].Modul + " Startzeit: " + data[4].Startzeit + " Endzeit: " + data[4].Endzeit + " Protokollant: " + data[0].Protokollant;
                    document.getElementById("zelle6").innerText = "ID: " + data[5].ID + " Modul: " + data[5].Modul + " Startzeit: " + data[5].Startzeit + " Endzeit: " + data[5].Endzeit + " Protokollant: " + data[0].Protokollant;

                    // document.getElementById("zelle1").innerText = JSON.stringify(data[0]);
                    // document.getElementById("zelle2").innerText = JSON.stringify(data[1]);
                    // document.getElementById("zelle3").innerText = JSON.stringify(data[2]);
                    // document.getElementById("zelle4").innerText = JSON.stringify(data[3]);
                    // document.getElementById("zelle5").innerText = JSON.stringify(data[4]);
                    // document.getElementById("zelle6").innerText = JSON.stringify(data[5]);
                }else if (xmlhttp.status==405){
                    window.alert("Invalid input!");
                }
            }
        }
        xmlhttp.open("GET","index.php/Calendar?username="+userData.username+"&ID_Studiengruppe=1"); //Keine ID Vorhanden!
        xmlhttp.setRequestHeader("Authorization", "Basic d2l3czE4aWk6YmFybS13ZWItMjAxOGlp");
        xmlhttp.setRequestHeader("api-jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlbm5pcyBIZXJybWFubiIsImV4cCI6MTY3NTg3NDQ1N30.xju7pfW3-zDPOVXoztwb2TZMAOH70U9PIPOiKtAYWgs");
        xmlhttp.send();
    }
    
}

//* function returnListViewReturn(data){
//    return data;
//

function addAbsence(moduleEventID){
    var userData = JSON.parse(document.cookie);
    var json = JSON.stringify({username: userData.username, moduleEventID: moduleEventID});
    if (window.XMLHttpRequest)
    {
        // AJAX nutzen mit IE7+, Chrome, Firefox, Safari, Opera
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // AJAX mit IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                document.getElementById("zelle1").innerText = xmlhttp.responseText;
            }else if (xmlhttp.status==405){
                window.alert("Invalid input!");
            }
        }
    }
    xmlhttp.open("PUT","Absence?"+json,true);
    xmlhttp.setRequestHeader("Authorization", "Basic d2l3czE4aWk6YmFybS13ZWItMjAxOGlp");
    xmlhttp.setRequestHeader("api-jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlbm5pcyBIZXJybWFubiIsImV4cCI6MTY3NTg3NDQ1N30.xju7pfW3-zDPOVXoztwb2TZMAOH70U9PIPOiKtAYWgs");
    xmlhttp.send();
}