function logintoUser(username, password){
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
    xmlhttp.open("GET","logintoUser.php?q="+json,true);
    xmlhttp.send();
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
                return xmlhttp.responseText;
            }else if (xmlhttp.status==405){
                window.alert("Invalid input!");
            }
        }
    }
    xmlhttp.open("GET","getUserInfo.php?q="+json,true);
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
    xmlhttp.open("GET","returnListView.php?q="+json,true);
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
    xmlhttp.open("GET","addAbsence.php?q="+json,true);
    xmlhttp.send();
}