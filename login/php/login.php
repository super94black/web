<?php

session_start();

if (isset($_SESSION['username'])) {
    header('location:./admin.php');//以SESSION的形式储存用户
}
else if ($_POST['username'] == '' || $_POST['password'] == '') {

      echo "用户名或密码没有输入";

    }
    else{
        if (isset($_POST['username']) && $_POST['username'] != '' &&
            isset($_POST['password']) && $_POST['password'] != '') {
            //限制用户名中不可以输单引号 和 --，它们会影响sql语句执行
            //1.正则表达式替换 2.addslashes
            $username = addslashes($_POST['username']);
            //转换 防止单引号和--的输入影响sql语句的注入，估计是吧用户信息导入数据库
            $salt = "tianwanggaidihu";
            // $password = $_POST['password'];//加密
            $password = md5(md5($_POST['password']).$salt);//对密码进行两次的散列处理
            try {
                $config = require_once './config.php';//保存管理员的数据库username 和 password
                $pdo = new PDO($config['dsn'], $config['user'], $config['password']);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);//设置驱动和异常处理的办法
                $res = $pdo->query("select * from user where username='{$username}'");
                $data = $res->fetch(PDO::FETCH_ASSOC);
               // $data = md5((md5($data.$)));
                //以一个XX的形式查询SQL中的信息,以方便来验证登陆
                if ($password == $data['password']) {
                   
                     $_SESSION['username'] = $data['username'];
                     header('location:./admin.php');
                    
                }else if($data['username'] == ""){
                    echo "用户名不存在";
                }
                else {
                    echo "密码错误";
                }
            } catch (PDOException $e) {
               echo "对不起您的网络有问题请稍后再试";
        }
    }
}
?>
