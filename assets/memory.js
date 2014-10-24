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

function buildComposite(){
	var wires = Wire.list(13);
	wires[1].value = true;

	var joins = [
		new Join(55,175,1,2),
		new Join(100,145,4,5),
		new Join(173,50,3,4),
		new Join(210,80,9,8),
		new Join(210,130,10,7),
		new Join(305,65,11,10),
		new Join(305,145,12,9)
	];

	var gates = [
		new Gate(Gate.NAND,120,50,0,2,3),
		new Gate(Gate.NAND,120,160,5,1,6),
		new Gate(Gate.NAND,240,65,3,8,11),
		new Gate(Gate.NAND,240,145,7,6,12)
	];

	var levers = [
		new Lever(8,5,0),
		new Lever(8,145,1)
	];

	var lamps = [ new Lamp(345,65,11) ];

	return composite(gates, wires, joins, lamps, levers);
}

start();