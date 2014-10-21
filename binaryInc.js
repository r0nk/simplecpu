var c = document.getElementById("binaryInc");
c.onselectstart = function(){return false;}
var ctx = c.getContext("2d");
ctx.textAlign="right";
var n = 0;
c.addEventListener('click',function(e){
	e.preventDefault();
	(n>254)?n=0:n+=1;
	update();
},false);
function update(){
	ctx.clearRect(0,0,1000,800);
	ctx.font = "48px Arial";
	ctx.fillStyle = "#000000";
	ctx.fillText(""+n,245,50);	
	numDraw(n);
	ctx.fillStyle = "#CCCCCC";
	ctx.font = "16px Arial";
	sizesDraw();
}
function sizesDraw(){
	ctx.fillRect(222,110,20,2);
	ctx.fillText("bit",219,117);	
	ctx.fillRect(145,130,98,2);
	ctx.fillText("nibble",141,137);	
	ctx.fillRect(31,150,212,2);
	ctx.fillText("byte",30,157);	
}
function numDraw(n){
	var space = 26;
	(chardraw(n,128,245-(7*space+8),95))?n-=128:n=n;
	(chardraw(n,64,245-(6*space+8),95))?n-=64:n=n;
	(chardraw(n,32,245-(5*space+8),95))?n-=32:n=n;
	(chardraw(n,16,245-(4*space+8),95))?n-=16:n=n;
	(chardraw(n,8,245-(3*space),95))?n-=8:n=n;
	(chardraw(n,4,245-(2*space),95))?n-=4:n=n;
	(chardraw(n,2,245-(1*space),95))?n-=2:n=n;
	chardraw(n,1,245,95)
	//messy, but we use it to show colors anyways, mine as well
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
