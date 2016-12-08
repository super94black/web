<?php
	define("exsitied",-1);
	define("nonexsitied",1);
	define("datebaseerror",0);
	
	
	$email = $_POST['email'];
	

	
		try{
		$config = require_once './config.php';//保存管理员的数据库username 和 password
                $pdo = new PDO($config['dsn'], $config['user'], $config['password']);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);//设置驱动和异常处理的办法
                $res1 = $pdo->query("select * from user where email='{$email}'");
                $data1= $res1->fetch(PDO::FETCH_ASSOC);
                
                
                if($data1['email'] == $email) {
                	echo exsitied;
                }
                else{
                	echo nonexsitied;
                }
		}catch(PDOException $e){
			echo "datebaseerror";
	}

?>