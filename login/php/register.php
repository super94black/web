<?php
	define("datebaseerror",0);
	define("ok",1);
	define("error",-1);
	define("exsitied",-2);
	$username = addslashes($_POST['username']);//防止sql注入
	$email = $_POST['email'];
	$tel = $_POST['tel'];
	$password = $_POST['password'];
	$salt = "tianwanggaidihu";//加密
	$password = md5(md5($password).$salt);
	// echo $username.$email.$tel.$password;
	
		try{
				$config = require_once './config.php';//保存管理员的数据库username 和 password
                $pdo = new PDO($config['dsn'], $config['user'], $config['password']);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);//设置驱动和异常处理的办法
                $sql = "select * from user where username=?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute(array($username));
                $data = $stmt->fetch(PDO::FETCH_ASSOC);
                if($data['username'] == $username) {

                	echo exesitied;
                	
                }
                	
                else
                {
                	$data = null;
                	$sql = null;
                	$stmt = null;

                	$sql1 = "insert into user (username,email,tel,password) value (?,?,?,?)";
		          	$stmt1 = $pdo->prepare($sql1);
		          	$stmt1->execute(array($username,$email,$tel,$password));
			        

			        $sql = "select * from user where username=?";
	                $stmt = $pdo->prepare($sql);
	                $stmt->execute(array($username));
	                $data = $stmt->fetch(PDO::FETCH_ASSOC);
		          	
		          	if($data['username']== $username) {
		          		echo ok;
		  
		          	}
		          	else {
		          		echo error;

		          	}
		          		$data1 = null;
	                	$stmt1 = null;
	                	$sql1= null;
	                	$data = null;
	                	$sql = null;
	                	$stmt = null;
                }
              	

            }catch(PDOException $e){
			echo "datebaseerror";
	}
?>