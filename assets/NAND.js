var composite = require('./gates/composite')
  , Gate = require('./gates/gate')
  , Wire = require('./gates/wire')
  , Lever = require('./gates/lever')
  , Lamp = require('./gates/lamp')
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
	var wires = Wire.list(3);

	var levers = [
		new Lever(8, 10, wires[0]),
		new Lever(8, 95, wires[1])
	];

	var gates = [ new Gate(Gate.NAND, 100, 80, wires[0], wires[1], wires[2]) ];

	var lamps = [ new Lamp(200, 80, wires[2]) ];

	return composite(gates, [], lamps, levers, wires);
}

start();