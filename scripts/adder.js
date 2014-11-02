(function start(){
	var graphic = buildComposite();

	simpleCpu.setup(graphic);

	graphic.update();
	graphic.update();
	graphic.update();
	graphic.update();
	graphic.update();
	graphic.render(simpleCpu.context);

	function drawComments(ctx){
		ctx.setTransform(1,0,0,1,0,0);	
		ctx.fillStyle = "#666666";
		ctx.fillText("1st bit",0,35);	
		ctx.fillText("2nd bit",0,185);
		ctx.fillText("carry in",255,20);	
		ctx.fillText("carry out",165,452);
		ctx.fillText("value",380,100);
	}

	function buildComposite() {
		var Wire = simpleCpu.Wire
		  , Lever = simpleCpu.Lever
		  , Lamp = simpleCpu.Lamp
		  , Join = simpleCpu.Join
		  , Gate = simpleCpu.Gate;

		var wires = Wire.list(12);

		var levers = [
		new Lever(8, 40, wires[0]),
		new Lever(8, 110, wires[1]),
		new Lever(220, 8, wires[5])
		];

		var gates = [
		new Gate(Gate.XOR, 120, 100, wires[0], wires[1], wires[4]),
		new Gate(Gate.XOR, 280, 115, wires[4], wires[7], wires[8]),
		new Gate(Gate.AND, 80, 200, wires[3], wires[2], wires[9]),
		new Gate(Gate.AND, 220, 200, wires[6], wires[5], wires[10]),
		new Gate(Gate.OR, 150, 350, wires[9], wires[10], wires[11])
		];

		var lamps = [
		new Lamp(380, 115, wires[8]),
		new Lamp(140, 450, wires[11])
		];

		var joins = [
		new Join(95, 80, wires[0], wires[2]),
		new Join(65, 130, wires[1], wires[3]),
		new Join(235, 130, wires[5], wires[7]),
		new Join(205, 100, wires[4], wires[6])
		];

		return simpleCpu.composite(gates, joins, lamps, levers, wires, drawComments);
	}
})();
