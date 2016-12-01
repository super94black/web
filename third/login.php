<?php
 header('Content-Type:text/html; charset= utf-8');
		$username = $_POST["username"];
		$password = $_POST["password"];
		if($username == "" || $password == "") 
		{
			echo '<script> alert("请输入用户名或密码");history.go(-1);</script>';
		}
		else if($password == "123456789") 
		{
			echo "<script> alert('欢迎登陆');self.location.href='http://www.baidu.com';</script>";
		}
			else
		{
			echo "<script> alert('密码错误');history.go(-1);</script>";
		}
	
	
?>