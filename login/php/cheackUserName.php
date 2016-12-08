<?php
	define("exsitied",-1);
	define("nonexsitied",1);
	define("datebaseerror",0);
	define("error",-2);
	
	//$match = preg_match('/^[\w_-\u4e00-\u9fa5]+$/', $_POST['username']);
	//$strlen = strlen($_POST['username']);
	$username = $_POST['username'];
	
		try{
		 		$config = require_once './config.php';//保存管理员的数据库username 和 password
                $pdo = new PDO($config['dsn'], $config['user'], $config['password']);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);//设置驱动和异常处理的办法
              	
	            $res = $pdo->query("select * from user where username='{$username}'");
	            $data = $res->fetch(PDO::FETCH_ASSOC);

		            if($data['username'] == $username) {
		            	echo exsitied;
		            }
		            else{
		            	echo nonexsitied;
		            }
                	$res = "";
                	$data= "";
             
                
                
		}catch(PDOException $e){
			echo "datebaseerror";
	}

?>