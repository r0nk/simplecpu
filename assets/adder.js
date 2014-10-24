var composite = require('./gates/composite')
  , Gate = require('./gates/gate')
  , Wire = require('./gates/wire')
  , Lever = require('./gates/lever')
  , Lamp = require('./gates/lamp')
  , Join = require('./gates/join')
  , setup = require('./util/common-setup');

function start(){
	var graphic = buildComposite();

	setup(graphic);

	graphic.update();
	graphic.update();
	graphic.update();
	graphic.update();
	graphic.update();
	graphic.render(setup.context);
}

window.drawComments = function(ctx){
	ctx.setTransform(1,0,0,1,0,0);	
	ctx.fillStyle = "#666666";
	ctx.fillText("1st bit",0,35);	
	ctx.fillText("2nd bit",0,185);
	ctx.fillText("carry in",255,20);	
	ctx.fillText("carry out",165,452);
	ctx.fillText("value",380,100);
}

function buildComposite() {
	var wires = Wire.list(12);

	var levers = [
		new Lever(8,40,0),
	  new Lever(8,110,1),
	  new Lever(220,8,5)
	];

	var gates = [
		new Gate(Gate.XOR,120,100,0,1,4),
		new Gate(Gate.XOR,280,115,4,7,8),
		new Gate(Gate.AND,80,200,3,2,9),
		new Gate(Gate.AND,220,200,6,5,10),
		new Gate(Gate.OR,150,350,9,10,11)
	];

	var lamps = [
		new Lamp(380,115,8),
		new Lamp(140,450,11)
	];

	var joins = [
		new Join(95,80,0,2),
		new Join(65,130,1,3),
		new Join(235,130,5,7),
		new Join(205,100,4,6)
	];

	return composite(gates, wires, joins, lamps, levers);
}

start();