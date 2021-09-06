var moduleEventID;
var moduleUsername;

function logintoUser(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var json = JSON.stringify({username: username, password: password});
    var response;
    if (window.XMLHttpRequest)
    {
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
        document.getElementById("formindex").style.visibility = "hidden";
        document.getElementById("button1").hidden = true;
    }else{
        document.getElementById("formindex").hidden = false;
        document.getElementById("button1").hidden = false;
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
                document.cookie = xmlhttp.responseText;

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
                    var list = document.getElementById("protokollul");
                    var length = list.childNodes.length; 
                    for (j=0; j<length - 1; j++){
                        list.removeChild(list.firstChild);
                    }
                    for (i=0; i<data.length; i++){
                        var li = document.createElement("li");
                        document.getElementById("protokollul").appendChild(li);
                        li.innerText = "ID: " + data[i].ID + " Modul: " + data[i].Modul + " Startzeit: " + data[i].Startzeit + " Endzeit: " + data[i].Endzeit + " Protokollant: " + data[i].Protokollant;
                        li.onclick = function(event){
                            var text = event.path[0].innerText;
                            moduleEventID = text.split(" ")[1];
                            moduleUsername = text.split(" ")[11];
                        }
                    }
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

function addAbsence(){
    var userData = JSON.parse(document.cookie);
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
                returnListView();
            }else if (xmlhttp.status==405){
                window.alert("Invalid input!");
            }
        }
    }
    xmlhttp.open("PUT","Calendar/Absence?username="+moduleUsername+"&moduleEventID="+moduleEventID,true);
    xmlhttp.setRequestHeader("Authorization", "Basic d2l3czE4aWk6YmFybS13ZWItMjAxOGlp");
    xmlhttp.setRequestHeader("api-jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlbm5pcyBIZXJybWFubiIsImV4cCI6MTY3NTg3NDQ1N30.xju7pfW3-zDPOVXoztwb2TZMAOH70U9PIPOiKtAYWgs");
    xmlhttp.send();
}