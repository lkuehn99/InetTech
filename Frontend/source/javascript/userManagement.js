function createBaUser(email, firstName, lastName, username, password, role, selectedModules){
    var json = JSON.stringify({email: email, firstName: firstName, username: username, password: password, role: role, selectedModules: selectedModules});
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
            }else if (xmlhttp.status==761){
                window.alert("User already exists!");
            }else if (xmlhttp.status==983){
                window.alert("Missing at leat one value!");
            }
        }
    }
    xmlhttp.open("GET","createBaUser.php?q="+json,true);
    xmlhttp.send();
}

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

//function 