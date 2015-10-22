var mouseDown = false;

var year = 1955;
var img = document.getElementById("nam");
var c = document.getElementById("map");
c.onselectstart = function(){return false;}
var ctx = c.getContext("2d");
ctx.font = "16px Arial";
setInterval(tick,1000);

c.addEventListener('mousedown',function(e){
	x=e.pageX-ctx.canvas.offsetLeft;
	y=e.pageY-ctx.canvas.offsetTop;

	update();
},false);

c.addEventListener('mouseup',function(e){
	mouseDown = false;
},false);

c.addEventListener('mousemove',function(e){
	if(mouseDown){
		y=e.pageY-ctx.canvas.offsetTop;
		update();
	}
},false);

//firefox band-aid
var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

c.addEventListener(mousewheelevt,function(e){
	//used to stop page scrolling while in canvas
	e.preventDefault();
	e.stopPropagation();

	s = e.wheelDelta ? e.wheelDelta : -e.detail;
	if(s>0){
		if(year<1975)
			year++;
	}else{
		if(year>1955)
			year--;
	}
	update();
	return false;
},false);

//start of objects
/*
function Cpu(x,y){
	this.x = x;
	this.y = y;
	this.etf = new Etf(x+50,y+90,memory[0]);
	this.etf.type = 1;
	this.lever = new Lever(x+10,y+60,false);
}
*/

function tick(){
	update();
}

function update(){
	drawFrame();
}

/*
function drawCpu(c){
	ctx.fillStyle = "#DDDDDD";
	ctx.fillRect(c.x,c.y,190,190);
	ctx.strokeStyle = "#999999";
	ctx.strokeRect(c.x,c.y,190,190);
	ctx.font = "14px Arial";
	ctx.fillStyle = "#999999";
	ctx.fillText("Instruction Pointer:",c.x+45,c.y+85);	
	ctx.font = "16px Arial";
	ctx.fillStyle = "#999999";
	ctx.fillText("CPU",c.x,c.y-3);	
	drawLever(c.lever);
	drawEtf(c.etf);
}
*/
function draw_map(){
	croptop=102;
	ctx.drawImage(nam,
			0,croptop,689,891-croptop,
			0,0,689,891-croptop);
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0,0,100,30);
	ctx.strokeStyle = "#999999";
	ctx.strokeRect(0,0,100,30);
	ctx.font = "16px Arial";
	ctx.fillStyle = "#999999";
	ctx.fillText("year:" + year.toString(),20,20);

}

function draw_battles()
{
	//TODO
}

function drawFrame(){
	ctx.setTransform(1,0,0,1,0,0);	
	ctx.clearRect(0,0,1000,1000);
	draw_map();
	draw_battles();
}

update();
