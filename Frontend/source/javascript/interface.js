var username;
var userInfo;

function logintoUser(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var json = JSON.stringify({username: this.username, password: password});
    if (window.XMLHttpRequest)
    {
        // AJAX nutzen mit IE7+, Chrome, Firefox, Safari, Opera
        xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                username  = document.getElementById("username").value;
            }else if (xmlhttp.status==405){
                username = null;
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

function getUserInfo(){
    var json = JSON.stringify({username: username});
    if (window.XMLHttpRequest)
    {
        // AJAX nutzen mit IE7+, Chrome, Firefox, Safari, Opera
        xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechanged=function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                userInfo = JSON.parse(xmlhttp.responseText);
            }else if (xmlhttp.status==405){
                window.alert("Invalid input!");
            }
        }
    }
    xmlhttp.open("GET","index.php/User?"+json, true);
    xmlhttp.setRequestHeader("Authorization", "Basic d2l3czE4aWk6YmFybS13ZWItMjAxOGlp");
    xmlhttp.setRequestHeader("api-jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlbm5pcyBIZXJybWFubiIsImV4cCI6MTY3NTg3NDQ1N30.xju7pfW3-zDPOVXoztwb2TZMAOH70U9PIPOiKtAYWgs");
    xmlhttp.send();
}

function returnListView(username){
    var json = JSON.stringify({username: username});
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
    xmlhttp.onreadystatechanged=function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                //document.getElementById("zelle1").innerText = xmlhttp.responseText;
            }else if (xmlhttp.status==405){
                window.alert("Invalid input!");
            }
        }
    }
    xmlhttp.open("GET","index.php/Calendar?"+json,true);
    xmlhttp.send();
}

//* function returnListViewReturn(data){
//    return data;
//

function addAbsence(){
    var json = JSON.stringify({username: username});
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
    xmlhttp.onreadystatechanged=function(){
        if (xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                //document.getElementById("zelle1").innerText = xmlhttp.responseText;
            }else if (xmlhttp.status==405){
                window.alert("Invalid input!");
            }
        }
    }
    xmlhttp.open("PUT","Absence?"+json,true);
    xmlhttp.send();
}