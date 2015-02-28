var c = document.getElementById("binaryInc");
c.onselectstart = function(){return false;}
var ctx = c.getContext("2d");
ctx.textAlign="right";

var number = 0;

c.addEventListener('click',function(e){
	e.preventDefault();
	number++;
	if(number>254)
		number=0;
	update();
},false);

function drawButton(){
	//the big flashy "CLICK ME" button that doesn't actually do anything.
	ctx.fillStyle = "#CCCCCC";
	ctx.fillRect(8,4,140,20);
	ctx.fillStyle = "#000000";
	ctx.fillText("click me to add one",145,20);
}

function drawLabels(){
	ctx.fillStyle = "#CCCCCC";
	ctx.font = "16px Arial";
	ctx.fillText("decimal",160,50);	
	ctx.fillText("binary",19,90);	
}

function update(){
	ctx.clearRect(0,0,1000,800);
	ctx.font = "48px Arial";
	ctx.fillStyle = "#000000";
	ctx.fillText(""+number,245,50);
	drawBinary(number);
	ctx.fillStyle = "#CCCCCC";
	ctx.font = "16px Arial";
	//drawLabels();
//	drawSizes();
	drawButton();
}
function drawSizes(){
	ctx.fillRect(222,110,20,2);
	ctx.fillText("bit",219,117);	
	ctx.fillRect(31,130,212,2);
	ctx.fillText("byte",30,137);	
}
function drawBinary(n){
	var space = 26;
	//messy, but we use it to show colors.
	(chardraw(n,128,245-(7*space+8),95))?n-=128:n=n;
	(chardraw(n,64,245-(6*space+8),95))?n-=64:n=n;
	(chardraw(n,32,245-(5*space+8),95))?n-=32:n=n;
	(chardraw(n,16,245-(4*space+8),95))?n-=16:n=n;
	(chardraw(n,8,245-(3*space),95))?n-=8:n=n;
	(chardraw(n,4,245-(2*space),95))?n-=4:n=n;
	(chardraw(n,2,245-(1*space),95))?n-=2:n=n;
	chardraw(n,1,245,95)
}
function chardraw(n,a,x,y){
	if((n-a)>=0){
		ctx.fillStyle = "#44DD44";
		ctx.fillText("1",x,y);	
		return true;
	}else{	
		ctx.fillStyle = "#FF5555";
		ctx.fillText("0",x,y);
		return false;
	}		
}
update();
