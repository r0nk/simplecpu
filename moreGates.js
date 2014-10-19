var lamps  = new Array();
var levers = new Array(); 
var NANDs  = new Array();
var joins  = new Array();
var wires  = new Array();

var c = document.getElementById("moreGates");
c.onselectstart = function(){return false;}
var ctx = c.getContext("2d");
ctx.font = "16px Arial";

c.addEventListener('click',function(e){
	checkAt(e.pageX-ctx.canvas.offsetLeft,e.pageY-ctx.canvas.offsetTop);
	update();
	update();
	update();
	update();
	update();
	update();
	drawFrame();
},false);
//start of objects
function Join(x,y,wire1,wire2){
	//a Join connects two wires togeather
	this.x = x;
	this.y = y;
	this.wire1 = wire1;
	this.wire2 = wire2;
}
function Wire(){
	//one value and an array of entities the wire is connected to.
	this.value = false;
	this.connections = new Array();
}	
function Lever(x,y,wire){ 
	this.x = x;	
	this.y = y;	
	this.r = 0;
	this.s = 1;
	this.wire = wire;//wire index; not actually a wire
}
function NAND(x,y,a,b,out){
	//a,b, and out are all input and output wires; they are the index 
	//location of the wire.
	this.x = x;
	this.y = y;
	this.r = 0;
	this.s = 1;
	this.a = a;
	this.b = b;
	this.out = out;
}
function Lamp(x,y,wire){
	this.x = x;	
	this.y = y;	
	this.r = 0;
	this.s = 1;
	this.wire = wire;//wire index; not actually a wire
}
//start of action functions
function mapWires(){
	//reads through array of all elements, and maps locations to the wire
	//array
	//only called once after the arrays of elements are mapped
	for(i=0;i<NANDs.length;i++){
		j = wires[NANDs[i].a].connections.length;
		p = {x:NANDs[i].x,y:NANDs[i].y - 15};
		wires[NANDs[i].a].connections[j] = p;

		j = wires[NANDs[i].b].connections.length;
		p = {x:NANDs[i].x,y:NANDs[i].y + 15};
		wires[NANDs[i].b].connections[j] = p; 

		j = wires[NANDs[i].out].connections.length;
		p = {x:NANDs[i].x + 43,y:NANDs[i].y};
		wires[NANDs[i].out].connections[j] = p;
	}
	for(i=0;i<levers.length;i++){
		l = levers[i].wire;
		j = wires[l].connections.length;
		p = {x:levers[i].x+30,y:levers[i].y+30};
		wires[l].connections[j] = p;
	}
	for(i=0;i<lamps.length;i++){
		l = lamps[i].wire;
		j = wires[l].connections.length;
		p = {x:lamps[i].x,y:lamps[i].y};
		wires[l].connections[j] = p;
	}
	for(i=0;i<joins.length;i++){
		l = joins[i].wire1;
		j = wires[l].connections.length;
		p = {x:joins[i].x,y:joins[i].y};
		wires[l].connections[j] = p;
		l = joins[i].wire2;
		j = wires[l].connections.length;
		wires[l].connections[j] = p;
	}
}
function checkAt(x,y){
	for(i=0;i<levers.length;i++){
		if(x > levers[i].x && x < (levers[i].x + 30)){
		 if(y > levers[i].y && y < (levers[i].y + 60)){
		  wires[levers[i].wire].value = !wires[levers[i].wire].value;
		 }
		}
	}
}
function NANDStep(){
	//calculate nand logic
	for(i=0;i<NANDs.length;i++){
		wires[NANDs[i].out].value = 
	 	 !(wires[NANDs[i].a].value && wires[NANDs[i].b].value);
	}
}
function joinStep(){
	for(i=0;i<joins.length;i++){
		a = joins[i].wire1;
		b = joins[i].wire2;
		wires[b].value = wires[a].value 
	}
}
function update(){
	NANDStep();
	//joinStep has to be last
	joinStep();
}
//start of drawing fucntions
function drawLamp(l){
	ctx.beginPath();
	ctx.setTransform(l.s,0,0,l.s,l.x,l.y - 10);	
	if(wires[l.wire].value){
		grd = ctx.createRadialGradient(10,10,0,10,10,20);
		grd.addColorStop(0,"#00FF00");
		grd.addColorStop(1,"#FFFFFF");
		ctx.fillStyle = grd;
		ctx.fillRect(-10,-10,40,40);
		ctx.fillStyle = "#EEFFEE";
		ctx.fillRect(0,0,20,20);
		ctx.fillStyle = "#99FF99";
		ctx.fillText("on",2,15);
	}else{
		ctx.fillStyle = "#BBBBBB";
		ctx.fillRect(0,0,20,20);
		ctx.fillStyle = "#999999";
		ctx.fillText("off",2,15);	
	}	
	ctx.stroke();
	ctx.fillStyle = "#000000";
}
function drawLever(l){
	ctx.beginPath();
	ctx.setTransform(l.s,0,0,l.s,l.x,l.y);	
	ctx.rotate(l.r*(Math.PI/180));
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,30,60);
	if(wires[l.wire].value){
		ctx.fillStyle = "#AAFFAA";
		ctx.fillRect(0,30,30,30);
		ctx.fillStyle = "#000000";
		ctx.fillText("on",4,50);	
	}else{
		ctx.fillStyle = "#FFAAAA";
		ctx.fillRect(0,0,30,30);
		ctx.fillStyle = "#000000";
		ctx.fillText("off",4,20);	
	}
}
function drawNAND(n){
	ctx.strokeStyle = "#999999";
	ctx.beginPath();
	ctx.setTransform(1,0,0,1,n.x,n.y);	
	ctx.rotate(n.r*(Math.PI/180));
	ctx.arc(0,0,30,0-(Math.PI/2),Math.PI/2);
	ctx.closePath();
	ctx.moveTo(45,0);
	ctx.arc(37,0,7,0,Math.PI*2);
	ctx.stroke();
}
function drawWire(w){
	//for simplicities sake, it only draws one line, 
	//however, the wire may be connected to more,
	//this is usefull in the case of joins in the middle of a wire.
	if(w.value){
		ctx.strokeStyle = "#00AA00";
	}else{
		ctx.strokeStyle = "#FF0000";
	}
	ctx.beginPath();
	ctx.setTransform(1,0,0,1,0,0);
	ctx.moveTo(w.connections[0].x,w.connections[0].y);
	ctx.lineTo(w.connections[1].x,w.connections[1].y);
	ctx.stroke();
	ctx.strokeStyle = "#000000";
}
function drawJoin(j){
	ctx.beginPath();
	ctx.setTransform(1,0,0,1,j.x-2,j.y-2);	
	if(wires[j.wire1].value){
		ctx.fillStyle = "#00FF00";
	}else{
		ctx.fillStyle = "#FF0000";
	}
	ctx.fillRect(0,0,4,4);
	ctx.fillStyle = "#000000";
}
function drawComments(){
	ctx.setTransform(1,0,0,1,0,0);
	ctx.fillStyle = "#000000";
	ctx.strokeStyle = "#000000";

	ctx.fillText("\"and\"",200,25);	
	ctx.setTransform(1,0,0,1,75,10);
	ctx.lineTo(0,0);
	ctx.arc(80,60,60,0-(Math.PI/2),Math.PI/2);
	ctx.lineTo(0,120);
	ctx.closePath();	
	ctx.stroke();
	ctx.setTransform(1,0,0,1,0,0);
	
	ctx.fillText("\"or\"",250,175);	
	ctx.beginPath();
	ctx.setTransform(1,0,0,1,120,160);
	ctx.lineTo(0,0);
	ctx.arc(80,70,70,0-(Math.PI/2),Math.PI/2);
	ctx.lineTo(-70,140);
	ctx.moveTo(0,00);
	ctx.arc(-70,70,70,0-(Math.PI/2),Math.PI/2);
	ctx.stroke();
	ctx.setTransform(1,0,0,1,0,0);
	
	ctx.fillText("\"xor\"",340,330);	
	ctx.beginPath();
	ctx.setTransform(1,0,0,1,150,360);
	ctx.lineTo(0,-20);
	ctx.arc(130,70,90,0-(Math.PI/2),Math.PI/2);
	ctx.lineTo(-90,160);
	ctx.moveTo(0,-20);
	ctx.arc(-90,70,90,0-(Math.PI/2),Math.PI/2);
	ctx.moveTo(-86,-13);
	ctx.arc(-120,70,90,0-(Math.PI/2)+0.35,Math.PI/2-0.35);
	ctx.stroke();
	ctx.setTransform(1,0,0,1,0,0);

}
function drawFrame(){
	ctx.setTransform(1,0,0,1,0,0);	
	ctx.clearRect(0,0,1000,1000);
	//draws everything onto the canvas 
	for(i = 0;i<=lamps.length-1;i++){
		drawLamp(lamps[i]);
	}
	for(i = 0;i<=levers.length-1;i++){
		drawLever(levers[i]);
	}
	for(i = 0;i<=NANDs.length-1;i++){
		drawNAND(NANDs[i]);
	}
	for(i = 0;i<=wires.length-1;i++){
		drawWire(wires[i]);
	}
	for(i = 0;i<=joins.length-1;i++){
		drawJoin(joins[i]);
	}
	drawComments();
}
//the shenanigans start here.
for(i=0;i<=22;i++)
	wires[i] = new Wire();

levers[0] = new Lever(8,8,0);
levers[1] = new Lever(8,70,1);
levers[2] = new Lever(8,165,5);
levers[3] = new Lever(8,235,6);
levers[4] = new Lever(8,335,14);
levers[5] = new Lever(8,465,15);

lamps[0] = new Lamp(250,70,4);
lamps[1] = new Lamp(300,230,13);
lamps[2] = new Lamp(400,430,22);

joins[0] = new Join(136,69,2,3);
joins[1] = new Join(120,195,7,8);
joins[2] = new Join(120,265,9,10);
joins[3] = new Join(145,365,14,16);
joins[4] = new Join(145,495,15,17);
joins[5] = new Join(215,430,18,19);
joins[6] = new Join(120,195,5,7);
joins[7] = new Join(120,265,6,9);

NANDs[0] = new NAND(90,70,0,1,2);
NANDs[1] = new NAND(160,70,2,3,4);
NANDs[2] = new NAND(140,195,7,8,11);
NANDs[3] = new NAND(140,265,9,10,12);
NANDs[4] = new NAND(210,230,11,12,13);
NANDs[5] = new NAND(170,430,16,17,18);
NANDs[6] = new NAND(240,380,14,18,20);
NANDs[7] = new NAND(240,480,19,15,21);
NANDs[8] = new NAND(310,430,20,21,22);

mapWires();
update();
update();
update();
update();
update();
drawFrame();
