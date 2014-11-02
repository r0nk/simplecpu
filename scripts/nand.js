(function start() {
	var graphic = buildComposite();

	simpleCpu.setup(graphic);

	graphic.update();
	graphic.update();
	graphic.update();
	graphic.update();
	graphic.update();
	graphic.render(simpleCpu.context);

	function buildComposite(){
		var Wire = simpleCpu.Wire
		  , Lever = simpleCpu.Lever
		  , Lamp = simpleCpu.Lamp
		  , Gate = simpleCpu.Gate;

		var wires = Wire.list(3);

		var levers = [
			new Lever(8, 10, wires[0]),
			new Lever(8, 95, wires[1])
		];

		var gates = [ new Gate(Gate.NAND, 100, 80, wires[0], wires[1], wires[2]) ];

		var lamps = [ new Lamp(200, 80, wires[2]) ];

		return simpleCpu.composite(gates, [], lamps, levers, wires);
	}
})();