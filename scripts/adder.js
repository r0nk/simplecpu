function clicker(e){
	 checkAt(e.pageX-ctx.canvas.offsetLeft,e.pageY-ctx.canvas.offsetTop);
	 update();
	 update();
	 update();
	 update();
	 update();
	 update();
	 drawFrame();
}

function drawComments(){
	ctx.setTransform(1,0,0,1,0,0);	
	ctx.fillStyle = "#666666";
	ctx.fillText("1st bit",0,35);	
	ctx.fillText("2nd bit",0,185);
	ctx.fillText("carry in",255,20);	
	ctx.fillText("carry out",165,452);
	ctx.fillText("value",380,100);
}
function setup(){
	//standard setup
	c = document.getElementById("gates");
	c.onselectstart = function(){return false;}
	ctx = c.getContext("2d");
	ctx.font = "16px Arial";

	c.addEventListener('click',clicker,false);
	//page unique setup
	for(i=0;i<12;i++)
		wires[i] = new Wire();

	levers[0] = new Lever(8,40,0);
	levers[1] = new Lever(8,110,1);
	levers[2] = new Lever(220,8,5);

	gates[0] = new Gate(XOR,120,100,0,1,4);
	gates[1] = new Gate(XOR,280,115,4,7,8);
	gates[2] = new Gate(AND,80,200,3,2,9);
	gates[3] = new Gate(AND,220,200,6,5,10);
	gates[4] = new Gate(OR,150,350,9,10,11);

	lamps[0]= new Lamp(380,115,8);
	lamps[1]= new Lamp(140,450,11);

	joins[0]= new Join(95,80,0,2);
	joins[1]= new Join(65,130,1,3);
	joins[2]= new Join(235,130,5,7);
	joins[3]= new Join(205,100,4,6);

	mapWires();
	update();
	update();
	update();
	update();
	update();
	drawFrame();
}
setup();

