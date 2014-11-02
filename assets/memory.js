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
		new Join(55, 175, wires[1], wires[2]),
		new Join(100, 145, wires[4], wires[5]),
		new Join(173, 50, wires[3], wires[4]),
		new Join(210, 80, wires[9], wires[8]),
		new Join(210, 130, wires[10], wires[7]),
		new Join(305, 65, wires[11], wires[10]),
		new Join(305, 145, wires[12], wires[9])
	];

	var gates = [
		new Gate(Gate.NAND, 120, 50, wires[0], wires[2], wires[3]),
		new Gate(Gate.NAND, 120, 160, wires[5], wires[1], wires[6]),
		new Gate(Gate.NAND, 240, 65, wires[3], wires[8], wires[11]),
		new Gate(Gate.NAND, 240, 145, wires[7], wires[6], wires[12])
	];

	var levers = [
		new Lever(8, 5, wires[0]),
		new Lever(8, 145, wires[1])
	];

	var lamps = [ new Lamp(345, 65, wires[11]) ];

	return composite(gates, joins, lamps, levers, wires);
}

start();