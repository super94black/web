 /*闭包*/
(

function(){
  var checkuser = new Array();
      checkuser[0] = false;
      checkuser[1] = false;
   var $=function(_id){
          return document.getElementById(_id);
    }

var inpStyle=function(){


    
    var inp=document.getElementsByTagName("input");//获得id为inpList 中的所有的input
    for(i=0;i<inp.length;i++){
        inp[i].onfocus=function(){
        var par=this.parentNode.parentNode;//指向每一个ul
        var msg=par.getElementsByTagName("p")[0];//获取说明信息第一个段落p
        par.className="point";//给class=def重新赋为class="point" 当鼠标点击输入框的时候颜色变为绿色
        check.focus[this.id](par,this,msg);// 触发获得焦点  三个参数代表 ul标签 当前输入框 p
     }
        inp[i].onblur=function(){//失去焦点的时候执行什么  ul标签的class恢复 msg恢复为获取第一个段落p 判断input的输入是否符合要求
        var par=this.parentNode.parentNode;
        var msg=par.getElementsByTagName("p")[0];
        par.className="def";
        check.blurs[this.id](par,this,msg);
   }
}
    $("enter").onclick=function(){//提交注册时
        var sub = subback(inp);
        
        if(sub == 1){
                var username = document.querySelector('#uname').value;
                var email = document.querySelector('#email').value;
                var tel = document.querySelector('#mobile').value;
                var password = document.querySelector('#pwd').value;
                var req = new XMLHttpRequest();
                req.open("post", "../php/register.php", true);
                req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                req.send('username=' + username + '&email='+email+'&tel='+tel+'&password='+password);

                req.onreadystatechange = function(){
                  if(req.readyState == 4 && req.status ==200) {
                    var response = req.responseText;
                    
                    switch(response){
                      case "0" :
                        alert("对不起您的网络有问题请稍后再试");
                        break;
                      case "-1" : 
                        alert("注册失败,请重新注册");
                        break;
                      case "1" :
                        alert("注册成功");
                        location.href="../html/in.html";
                        break;
                      case "-2" :
                        alert("用户名已被注册");
                        break;
                    }
                  }
                }
               
        }
        else {
             alert("请继续完善您的注册信息!");
        }
}

var check={
    focus:{
      uname:function(_ul,_this,_p){
          _ul.className="point";//改变输入框的颜色为蓝色
          
          },
          email:function(_ul,_this,_p){
          _ul.className="point";
          
          },
          mobile:function(_ul,_this,_p){
          _ul.className="point";
         
          },
          pwd:function(_ul,_this,_p){
          _ul.className="point";
          
          },
          qrpwd:function(_ul,_this,_p){
          _ul.className="point";
          
          }
},
  blurs:{//失去焦点时
    uname:function(_ul,_this,_p){//上一个输入框的三个参数 ul标签、当前输入框、错误的信息
     _ul.className="error";    //当信息输入错误时执行error 使得输入框变为红色   
     var flag=false;
    if(_this.value==""){        
      _p.innerHTML="<i></i>用户名不能为空！";
        }
        else if(_this.value.length<4 || _this.value.length>16){                                                                        
            _p.innerHTML="<i></i>用户名长度应控制在4-16位字符之间！";
      }
        else if(!/^[\w_-\u4e00-\u9fa5]+$/.test(_this.value)){       //用户名只能是数字，字母，下划线，-，.，中文组成的一个字串                                                                         
            _p.innerHTML = "<i></i>用户名只能由大小写字母，数字，下划线，中横线和中文组成！";
    }   
        else{ 
                var req = new XMLHttpRequest();
                var username = document.querySelector('#uname').value;

                req.open('POST','../php/cheackUserName.php',true);
                req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                req.send('username='+ username);

                  req.onreadystatechange = function () {
                      if (req.readyState == 4 && req.status == 200) {

                          var response = req.responseText;
                          // alert(response);
                         switch(response){
                         
                          case "-1" : 
                              _p.innerHTML="<i></i>用户名已被注册";
                              checkuser[0] = false;
                              break;
                          case "0" :
                            _p.innerHTML="<i></i>数据库连接错误";
                            
                            break;
                          case "1" :
                              _ul.className="ok";
                              _p.innerHTML="<i></i>用户名可用";
                              checkuser[0] = true;
                              break;
                         }
                           console.log(req.getAllResponseHeaders());
                  }
                      
                      }
                     flag=true;
                           
                  }
               return flag;    
      
}
,
email:function(_ul,_this,_p){
         _ul.className="error";
          var flag=false;
      if(_this.value==""){
       _p.innerHTML="<i></i>邮箱不能为空！";
        }
        else if(!/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(_this.value)){                                                                        
              _p.innerHTML="<i></i>请输入正确的邮箱地址！";
          }
          else{
             var req = new XMLHttpRequest();
                var email = document.querySelector('#email').value;
                req.open('POST','../php/checkEmail.php',true);
                req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                req.send('email='+ email);

                  req.onreadystatechange = function () {
                      if (req.readyState == 4 && req.status == 200) {

                          var response = req.responseText;
                         
                         switch(response) {
                          
                          case "-1" : 
                               _p.innerHTML="<i></i>该邮箱已被注册";
                             checkuser[1]=false;
                              break;
                          case "0" :
                            _p.innerHTML="<i></i>数据库连接错误";
                            
                            break;
                          case "1" :
                              _ul.className="ok";
                              _p.innerHTML="<i></i>邮箱填写正确";
                              checkuser[1] = true;
                              break;
                         }
                           console.log(req.getAllResponseHeaders());
                  }
                      
                      }
                   flag=true;
                           
          }
          return flag;      
}
,
mobile:function(_ul,_this,_p){
 _ul.className="error";
  var flag=false;
  if(_this.value==""){
    _p.innerHTML="<i></i>电话号码不能为空！";
  }else if(!/^0?1[3|4|5|8][0-9]\d{8}$/.test(_this.value)){                                                                        
          _p.innerHTML="<i></i>请输入正确的电话号码！";
          }
          else{
              _ul.className="ok";
              _p.innerHTML="<i></i>电话号码输入正确!";
              flag=true;
          }
            return flag;
}
,
pwd:function(_ul,_this,_p){
 _ul.className="error";
     var flag=false;
     if(_this.value==""){
     
      _p.innerHTML="<i></i>密码不能为空！";
      }else if(_this.value.length<4 || _this.value.length>16){
              
          _p.innerHTML="<i></i>密码应该在4-16位之间！";
          }else if(!/^[\w_-]+$/.test(_this.value)){                                                                        
          _p.innerHTML="<i></i>密码只能由大小字母、数字、下划线组成！";
       }
      else{
          _ul.className="ok";
          _p.innerHTML="<i></i>密码输入正确";
          flag=true;
    }
      return flag;
}
  ,
qrpwd:function(_ul,_this,_p){
        _ul.className="error";
        var flag=false;
      if(_this.value==""){
                  _p.innerHTML="<i></i>请再次输入密码！！";
                  
                  }else if(_this.value!=$("pwd").value){
                          
                          _p.innerHTML="<i></i>密码两次输入不一致，请重新输入！";
                          }
                          else{
                                  _ul.className="ok";
                                        _p.innerHTML="<i></i>两次密码输入一致!";
                                        flag=true;
                                  }
                                  return flag;
        }
}
}
var subback=function(inps){
var sub;
for(var i=0;i<inps.length;i++){
        //inps[i].focus();
        var flag=true;
        var par=inps[i].parentNode.parentNode;
        var msg=par.getElementsByTagName("p")[0];
        
        
        if(!check.blurs[inps[i].id](par,inps[i],msg)){
                flag=false;
                break;
                }
        }
        if(flag&&checkuser[0]==true&&checkuser[1]==true){
              sub = 1;
              return sub;
           }

        else{
              sub = 0;
              return sub;
         }    
      }
}
window.onload=function(){//程序的入口 
      
      inpStyle();
    }
  }
)();
