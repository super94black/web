window.onload = function() {
	var btn = document.querySelector('#login-button');
	var btn2 = document.querySelector('#register');
	btn.onclick=function(){

	var req = new XMLHttpRequest();
	var username = document.querySelector('#username').value;
	var password = document.querySelector('#pwd').value;

	
	req.open('POST','../php/login.php',true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	req.send('username=' + username + '&password=' + password);

	  req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {

           var response = req.responseText;
           	alert(response);
           	
            console.log(req.getAllResponseHeaders());
        }
        
    }
    
   }
   btn2.onclick = function(){
   	location.href="../html/register.html";
   }
}