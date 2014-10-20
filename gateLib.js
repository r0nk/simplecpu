//main(only) library file
var lamps  = new Array();
var levers = new Array(); 
var gates  = new Array();
var joins  = new Array();
var wires  = new Array();

var NAND = 0;
var AND  = 1;
var OR   = 2;
var XOR  = 3;
var tNAND = 4;//slightly grey-colored NAND
//have to have this as globals 
var c;
var ctx;
//start of objects
function Join(x,y,wire1,wire2){
	//a Join connects two wires together
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
function Gate(kind,x,y,a,b,out){
	this.kind = kind;
	this.x = x;
	this.y = y;
	this.r = 0;
	this.s = 1;
	//a,b, and out are all input and output wires; they are the index 
	//location of the wire.
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
	for(i=0;i<gates.length;i++){
		switch(gates[i].kind){
		case tNAND:
		case NAND:
			j = wires[gates[i].a].connections.length;
			p = {x:gates[i].x,y:gates[i].y - 15};
			wires[gates[i].a].connections[j] = p;

			j = wires[gates[i].b].connections.length;
			p = {x:gates[i].x,y:gates[i].y + 15};
			wires[gates[i].b].connections[j] = p; 

			j = wires[gates[i].out].connections.length;
			p = {x:gates[i].x + 43,y:gates[i].y};
			wires[gates[i].out].connections[j] = p;
			break;
		case AND://AND
			j = wires[gates[i].a].connections.length;
			p = {x:gates[i].x-15,y:gates[i].y};
			wires[gates[i].a].connections[j] = p;

			j = wires[gates[i].b].connections.length;
			p = {x:gates[i].x+15,y:gates[i].y};
			wires[gates[i].b].connections[j] = p; 

			j = wires[gates[i].out].connections.length;
			p = {x:gates[i].x,y:gates[i].y+60};
			wires[gates[i].out].connections[j] = p;
			break;
		case OR://OR
			j = wires[gates[i].a].connections.length;
			p = {x:gates[i].x-15,y:gates[i].y + 25};
			wires[gates[i].a].connections[j] = p;

			j = wires[gates[i].b].connections.length;
			p = {x:gates[i].x+15,y:gates[i].y + 25};
			wires[gates[i].b].connections[j] = p; 

			j = wires[gates[i].out].connections.length;
			p = {x:gates[i].x,y:gates[i].y+60};
			wires[gates[i].out].connections[j] = p;
			break;
		case XOR://XOR
			j = wires[gates[i].a].connections.length;
			p = {x:gates[i].x + 10,y:gates[i].y - 15};
			wires[gates[i].a].connections[j] = p;

			j = wires[gates[i].b].connections.length;
			p = {x:gates[i].x + 10,y:gates[i].y + 15};
			wires[gates[i].b].connections[j] = p; 

			j = wires[gates[i].out].connections.length;
			p = {x:gates[i].x + 60,y:gates[i].y};
			wires[gates[i].out].connections[j] = p;
			break;
		}
	}
	for(i=0;i<levers.length;i++){
		l = levers[i].wire;
		j = wires[l].connections.length;
		p = {x:levers[i].x+15,y:levers[i].y+30};
		wires[l].connections[j] = p;
	}
	for(i=0;i<lamps.length;i++){
		l = lamps[i].wire;
		j = wires[l].connections.length;
		p = {x:lamps[i].x+10,y:lamps[i].y};
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
function gateStep(){
	//calculate gate logic
	for(i=0;i<gates.length;i++){
		switch(gates[i].kind){
		case tNAND:
		case NAND:
			wires[gates[i].out].value = 
	 	 	 !(wires[gates[i].a].value && wires[gates[i].b].value);
			break;
		case AND:
			wires[gates[i].out].value = 
	 	 	 (wires[gates[i].a].value && wires[gates[i].b].value);
			break;
		case OR:
			wires[gates[i].out].value = 
	 	 	 (wires[gates[i].a].value || wires[gates[i].b].value);
			break;
		case XOR:
			wires[gates[i].out].value = 
	 	 	 (wires[gates[i].a].value != wires[gates[i].b].value);
			break;
		}
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
	gateStep();
	//joinStep has to be last
	joinStep();
}
//start of drawing fucntions
function drawLamp(l){
	ctx.beginPath();
	ctx.setTransform(l.s,0,0,l.s,l.x,l.y - 10);	
	if(wires[l.wire].value){
		grd = ctx.createRadialGradient(10,10,0,10,10,20);
		grd.addColorStop(0,"rgba(100,255,100,1.0)");
		grd.addColorStop(1,"rgba(100,255,100,0.0)");
		ctx.fillStyle = grd;
		ctx.fillRect(-10,-10,40,40);
		ctx.fillStyle = "rgba(255,255,255,1.0)";
		ctx.fillRect(0,0,20,20);
		ctx.fillStyle = "#88FF88";
		ctx.fillText("on",0,15);
	}else{
		ctx.fillStyle = "#BBBBBB";
		ctx.fillRect(0,0,20,20);
		ctx.fillStyle = "#888888";
		ctx.fillText("off",0,15);	
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
function drawGate(n){
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.setTransform(1,0,0,1,n.x,n.y);	
	switch(n.kind){
	case tNAND:
		ctx.strokeStyle = "#BBBBBB";
	case NAND:
		ctx.rotate(n.r*(Math.PI/180));
		ctx.arc(0,0,30,0-(Math.PI/2),Math.PI/2);
		ctx.closePath();
		ctx.moveTo(45,0);
		ctx.arc(37,0,7,0,Math.PI*2);
		break;
	case AND:
		ctx.lineTo(30,0);	
		ctx.arc(0,30,30,0,Math.PI);
		ctx.lineTo(-30,0);	
		ctx.closePath();
		break;
	case OR:
		ctx.arc(0,0,30,0,Math.PI);
		ctx.moveTo(30,0);	
		ctx.arc(0,30,30,0,Math.PI);
		ctx.lineTo(-30,0);	
		break;
	case XOR:
		ctx.arc(0,0,30,0-(Math.PI/2),Math.PI/2);
		ctx.moveTo(30,-30);
		ctx.lineTo(0,-30);
		ctx.arc(30,0,30,0-(Math.PI/2),Math.PI/2);
		ctx.moveTo(30,30);
		ctx.lineTo(0,30);
		ctx.moveTo(-6,-30);
		ctx.arc(-15,0,30,0-(Math.PI/2)+0.3,Math.PI/2-0.3);
		break;
	}
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

function drawFrame(){
	ctx.setTransform(1,0,0,1,0,0);	
	ctx.clearRect(0,0,1000,1000);
	//draws everything onto the canvas 
	for(i = 0;i<=wires.length-1;i++){
		drawWire(wires[i]);
	}
	for(i = 0;i<=lamps.length-1;i++){
		drawLamp(lamps[i]);
	}
	for(i = 0;i<=levers.length-1;i++){
		drawLever(levers[i]);
	}
	for(i = 0;i<=gates.length-1;i++){
		drawGate(gates[i]);
	}
	for(i = 0;i<=joins.length-1;i++){
		drawJoin(joins[i]);
	}
	drawComments();
}
