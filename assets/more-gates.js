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

function setup(){
	for(i=0;i<=22;i++) {
		gatesLib.wires[i] = new Wire();
	}

	gatesLib.levers[0] = new Lever(8,8,0);
	gatesLib.levers[1] = new Lever(8,70,1);
	gatesLib.levers[2] = new Lever(8,165,5);
	gatesLib.levers[3] = new Lever(8,235,6);
	gatesLib.levers[4] = new Lever(8,335,14);
	gatesLib.levers[5] = new Lever(8,465,15);

	gatesLib.lamps[0] = new Lamp(250,70,4);
	gatesLib.lamps[1] = new Lamp(300,230,13);
	gatesLib.lamps[2] = new Lamp(400,430,22);

	gatesLib.joins[0] = new Join(136,69,2,3);
	gatesLib.joins[1] = new Join(120,195,7,8);
	gatesLib.joins[2] = new Join(120,265,9,10);
	gatesLib.joins[3] = new Join(145,365,14,16);
	gatesLib.joins[4] = new Join(145,495,15,17);
	gatesLib.joins[5] = new Join(215,430,18,19);
	gatesLib.joins[6] = new Join(120,195,5,7);
	gatesLib.joins[7] = new Join(120,265,6,9);

	gatesLib.gates[0] = new Gate(Gate.tNAND,90,70,0,1,2);
	gatesLib.gates[1] = new Gate(Gate.tNAND,160,70,2,3,4);
	gatesLib.gates[2] = new Gate(Gate.tNAND,140,195,7,8,11);
	gatesLib.gates[3] = new Gate(Gate.tNAND,140,265,9,10,12);
	gatesLib.gates[4] = new Gate(Gate.tNAND,210,230,11,12,13);
	gatesLib.gates[5] = new Gate(Gate.tNAND,170,430,16,17,18);
	gatesLib.gates[6] = new Gate(Gate.tNAND,240,380,14,18,20);
	gatesLib.gates[7] = new Gate(Gate.tNAND,240,480,19,15,21);
	gatesLib.gates[8] = new Gate(Gate.tNAND,310,430,20,21,22);

	gatesLib.mapWires();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.drawFrame(ctx);
}
setup();
