var Gate = require('./gate')
  , Wire = require('./wire')
  , Lever = require('./lever')
  , Lamp = require('./lamp')
  , Join = require('./join');

window.drawComments = function(ctx) {}

module.exports = function(gates, wires, joins, lamps, levers){
	//reads through array of all elements, and maps locations to the wire
	//array
	//only called once after the arrays of elements are mapped
	gates.forEach(function(gate) {
		switch(gate.kind){
		case Gate.tNAND:
		case Gate.NAND:
			wires[gate.a].connections.push({x:gate.x,y:gate.y - 15});
			wires[gate.b].connections.push({x:gate.x,y:gate.y + 15}); 
			wires[gate.out].connections.push({x:gate.x + 43,y:gate.y});
			break;
		case Gate.AND://AND
			wires[gate.a].connections.push({x:gate.x-15,y:gate.y});
			wires[gate.b].connections.push({x:gate.x+15,y:gate.y}); 
			wires[gate.out].connections.push({x:gate.x,y:gate.y+60});
			break;
		case Gate.OR://OR
			wires[gate.a].connections.push({x:gate.x-15,y:gate.y + 25});
			wires[gate.b].connections.push({x:gate.x+15,y:gate.y + 25}); 
			wires[gate.out].connections.push({x:gate.x,y:gate.y+60});
			break;
		case Gate.XOR://XOR
			wires[gate.a].connections.push({x:gate.x + 10,y:gate.y - 15});
			wires[gate.b].connections.push({x:gate.x + 10,y:gate.y + 15}); 
			wires[gate.out].connections.push({x:gate.x + 60,y:gate.y});
			break;
		}
	});
	
	levers.forEach(function(lever) {
		wires[lever.wire].connections.push({x:lever.x+15,y:lever.y+30});
	});
	
	lamps.forEach(function(lamp) {
		wires[lamp.wireIdx].connections.push({x:lamp.x+10,y:lamp.y});
	});

	joins.forEach(function(join) {
		wires[join.wire1].connections.push({x:join.x,y:join.y});
		wires[join.wire2].connections.push({x:join.x,y:join.y});
	});

	return {
		checkAt: checkAt.bind(undefined, wires, levers),
		update: update.bind(undefined, gates, wires, joins),
		render: drawFrame.bind(undefined, gates, wires, joins, lamps, levers)
	};
}

function checkAt(wires, levers, x, y){
	levers.forEach(function(lever) {
		if(x > lever.x && x < (lever.x + 30)){
		 if(y > lever.y && y < (lever.y + 60)){
		  wires[lever.wire].value = !wires[lever.wire].value;
		 }
		}
	});
}

function update(gates, wires, joins){
	gateStep(gates, wires);
	//joinStep has to be last
	joinStep(wires, joins);
}

function drawFrame(gates, wires, joins, lamps, levers, ctx){
	ctx.setTransform(1,0,0,1,0,0);	
	ctx.clearRect(0,0,1000,1000);

	wires.forEach(function(wire) {
		Wire.draw(wire, ctx);
	});

	lamps.forEach(function(lamp) {
		Lamp.draw(wires, lamp, ctx);
	});

	levers.forEach(function(lever) {
		Lever.draw(wires, lever, ctx);
	});

	gates.forEach(function(gate) {
		Gate.draw(gate, ctx);
	});

	joins.forEach(function(join) {
		Join.draw(wires, join, ctx);
	});

	drawComments(ctx);
}

function gateStep(gates, wires){
	//calculate gate logic
	gates.forEach(function(gate) {
		switch(gate.kind){
		case Gate.tNAND:
		case Gate.NAND:
			wires[gate.out].value = 
	 	 	 !(wires[gate.a].value && wires[gate.b].value);
			break;
		case Gate.AND:
			wires[gate.out].value = 
	 	 	 (wires[gate.a].value && wires[gate.b].value);
			break;
		case Gate.OR:
			wires[gate.out].value = 
	 	 	 (wires[gate.a].value || wires[gate.b].value);
			break;
		case Gate.XOR:
			wires[gate.out].value = 
	 	 	 (wires[gate.a].value != wires[gate.b].value);
			break;
		}
	});
}

function joinStep(wires, joins){
	joins.forEach(function(join) {
		a = join.wire1;
		b = join.wire2;
		wires[b].value = wires[a].value 
	});
}