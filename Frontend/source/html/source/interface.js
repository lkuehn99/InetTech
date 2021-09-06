function logintoUser(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var json = JSON.stringify({username: username, password: password});
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
                window.open('homepage.html');
            }else if (xmlhttp.status==405){
                window.alert("Invalid input!");
            }
        }
    }
    xmlhttp.open("POST","http://barm.wappworker.de/wiws18ii/User/Login",true);
    xmlhttp.send(json);
}

function getUserInfo(username){
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
                //
            }else if (xmlhttp.status==405){
                window.alert("Invalid input!");
            }
        }
    }
    xmlhttp.open("GET","http://barm.wappworker.de/wiws18ii/User?"+json,true);
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
    xmlhttp.open("GET","Calendar?"+json,true);
    xmlhttp.send();
}

//* function returnListViewReturn(data){
//    return data;
//

function addAbsence(username){
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