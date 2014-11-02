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

	function buildComposite(){
		var Wire = simpleCpu.Wire
		  , Lever = simpleCpu.Lever
		  , Lamp = simpleCpu.Lamp
		  , Join = simpleCpu.Join
		  , Gate = simpleCpu.Gate;

		var wires = Wire.list(23);

		var levers = [
			new Lever(8, 8, wires[0]),
			new Lever(8, 70, wires[1]),
			new Lever(8, 165, wires[5]),
			new Lever(8, 235, wires[6]),
			new Lever(8, 335, wires[14]),
			new Lever(8, 465, wires[15])
		];

		var lamps = [
			new Lamp(250, 70, wires[4]),
			new Lamp(300, 230, wires[13]),
			new Lamp(400, 430, wires[22])
		];

		var joins = [
			new Join(136, 69, wires[2], wires[3]),
			new Join(120, 195, wires[7], wires[8]),
			new Join(120, 265, wires[9], wires[10]),
			new Join(145, 365, wires[14], wires[16]),
			new Join(145, 495, wires[15], wires[17]),
			new Join(215, 430, wires[18], wires[19]),
			new Join(120, 195, wires[5], wires[7]),
			new Join(120, 265, wires[6], wires[9])
		];

		var gates = [
			new Gate(Gate.tNAND, 90, 70, wires[0], wires[1], wires[2]),
			new Gate(Gate.tNAND, 160, 70, wires[2], wires[3], wires[4]),
			new Gate(Gate.tNAND, 140, 195, wires[7], wires[8], wires[11]),
			new Gate(Gate.tNAND, 140, 265, wires[9], wires[10], wires[12]),
			new Gate(Gate.tNAND, 210, 230, wires[11], wires[12], wires[13]),
			new Gate(Gate.tNAND, 170, 430, wires[16], wires[17], wires[18]),
			new Gate(Gate.tNAND, 240, 380, wires[14], wires[18], wires[20]),
			new Gate(Gate.tNAND, 240, 480, wires[19], wires[15], wires[21]),
			new Gate(Gate.tNAND, 310, 430, wires[20], wires[21], wires[22])
		];

		return simpleCpu.composite(gates, joins, lamps, levers, wires, drawComments);
	}
})();