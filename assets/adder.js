var gatesLib = require('./lib/gates')
  , c = null
  , ctx = null;

function clicker(e){
	 gatesLib.checkAt(e.pageX-ctx.canvas.offsetLeft,e.pageY-ctx.canvas.offsetTop);
	 gatesLib.update();
	 gatesLib.update();
	 gatesLib.update();
	 gatesLib.update();
	 gatesLib.update();
	 gatesLib.update();
	 gatesLib.drawFrame();
}

window.drawComments = function(){
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
	gatesLib.setCtx(ctx);

	c.addEventListener('click',clicker,false);
	//page unique setup
	for(i=0;i<12;i++)
		gatesLib.wires[i] = new gatesLib.Wire();

	gatesLib.levers[0] = new gatesLib.Lever(8,40,0);
	gatesLib.levers[1] = new gatesLib.Lever(8,110,1);
	gatesLib.levers[2] = new gatesLib.Lever(220,8,5);

	gatesLib.gates[0] = new gatesLib.Gate(gatesLib.XOR,120,100,0,1,4);
	gatesLib.gates[1] = new gatesLib.Gate(gatesLib.XOR,280,115,4,7,8);
	gatesLib.gates[2] = new gatesLib.Gate(gatesLib.AND,80,200,3,2,9);
	gatesLib.gates[3] = new gatesLib.Gate(gatesLib.AND,220,200,6,5,10);
	gatesLib.gates[4] = new gatesLib.Gate(gatesLib.OR,150,350,9,10,11);

	gatesLib.lamps[0]= new gatesLib.Lamp(380,115,8);
	gatesLib.lamps[1]= new gatesLib.Lamp(140,450,11);

	gatesLib.joins[0]= new gatesLib.Join(95,80,0,2);
	gatesLib.joins[1]= new gatesLib.Join(65,130,1,3);
	gatesLib.joins[2]= new gatesLib.Join(235,130,5,7);
	gatesLib.joins[3]= new gatesLib.Join(205,100,4,6);

	gatesLib.mapWires();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.drawFrame();
}
setup();

