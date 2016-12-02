window.onload= function(){
	var list = document.querySelector("#list");
	var buttons = document.querySelectorAll("span");
	var prev = document.querySelector("#prev");
	var right = document.querySelector("#right");
	var index = 1;
	var flashed = false;
	var timer;
function showLight(){
	for(var i = 0; i < buttons.length; i++){
		if(buttons[i].className == "on"){
			buttons[i].className = "";
			break;
		}
	}

	buttons[index - 1].className="on";
}

function flash(offset) {
	flashed = true;
	var Left = parseInt(list.style.left)+offset;
	var time = 200;//总位移的时间
	var interval = 10;//每次移动的时间间隔
	var speed = offset/(time/interval);//每次移动的距离
	function go(){
		if(speed > 0 && parseInt(list.style.left) < Left || (speed < 0 && parseInt(list.style.left) > Left)){
			list.style.left = parseInt(list.style.left) + speed + "px";
			setTimeout(go,interval);
		}
		else {
			flashed = false;
			list.style.left = Left + "px";
			if(Left < -3000 ){
				list.style.left = -600 + "px";
			}

			if(Left > -600) {
				list.style.left = -3000 + "px";
			}
		}

	}

	go();

}

function play() {
	timer = setInterval(function() {
		right.click();
	},2000);
}

function stop() {
	clearInterval(timer);

}
	prev.addEventListener("click",function(){
		if(flashed) {
			return;
		}
		index -= 1;
		if(index == 0) {
			index = 5;
		}
		if(flashed == false){
			flash(600);
		}
		
		showLight();
	},false);
	right.addEventListener("click",function() {
		if(flashed) {//只有当位移完成时才会触发下面的程序
			return;
		}
		index += 1;
		if(index == 6){
			index = 1;
		}
		if(flashed == false) {
			flash(-600);
		}
		showLight();

	},false);
	
	for(var i = 0; i < buttons.length;i++){

		buttons[i].addEventListener("click",function(event){
		if(flashed){
				return;
			}
			if(event.className == "on") {
				return;
			}
			
			var myIndex = parseInt(event.target.getAttribute("index"));
			var offset = -600 * (myIndex - index);
			index = myIndex;
			flash(offset);
			showLight();
	},false);
	
}	

	document.querySelector("#container").onmouseover = stop;
	document.querySelector("#container").onmouseout = play;

	play();
}
