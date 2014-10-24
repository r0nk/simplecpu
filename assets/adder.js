var gatesLib = require('./gates/index')
  , Gate = require('./gates/gate')
  , Wire = require('./gates/wire')
  , Lever = require('./gates/lever')
  , Lamp = require('./gates/lamp')
  , Join = require('./gates/join')
  , common = require('./util/common-setup')
  , ctx = common.getContext();

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
	for(i=0;i<12;i++) {
		gatesLib.wires[i] = new Wire();
	}

	gatesLib.levers[0] = new Lever(8,40,0);
	gatesLib.levers[1] = new Lever(8,110,1);
	gatesLib.levers[2] = new Lever(220,8,5);

	gatesLib.gates[0] = new Gate(Gate.XOR,120,100,0,1,4);
	gatesLib.gates[1] = new Gate(Gate.XOR,280,115,4,7,8);
	gatesLib.gates[2] = new Gate(Gate.AND,80,200,3,2,9);
	gatesLib.gates[3] = new Gate(Gate.AND,220,200,6,5,10);
	gatesLib.gates[4] = new Gate(Gate.OR,150,350,9,10,11);

	gatesLib.lamps[0]= new Lamp(380,115,8);
	gatesLib.lamps[1]= new Lamp(140,450,11);

	gatesLib.joins[0]= new Join(95,80,0,2);
	gatesLib.joins[1]= new Join(65,130,1,3);
	gatesLib.joins[2]= new Join(235,130,5,7);
	gatesLib.joins[3]= new Join(205,100,4,6);

	gatesLib.mapWires();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.drawFrame(ctx);
}
setup();

