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
			j = wires[gate.a].connections.length;
			p = {x:gate.x,y:gate.y - 15};
			wires[gate.a].connections[j] = p;

			j = wires[gate.b].connections.length;
			p = {x:gate.x,y:gate.y + 15};
			wires[gate.b].connections[j] = p; 

			j = wires[gate.out].connections.length;
			p = {x:gate.x + 43,y:gate.y};
			wires[gate.out].connections[j] = p;
			break;
		case Gate.AND://AND
			j = wires[gate.a].connections.length;
			p = {x:gate.x-15,y:gate.y};
			wires[gate.a].connections[j] = p;

			j = wires[gate.b].connections.length;
			p = {x:gate.x+15,y:gate.y};
			wires[gate.b].connections[j] = p; 

			j = wires[gate.out].connections.length;
			p = {x:gate.x,y:gate.y+60};
			wires[gate.out].connections[j] = p;
			break;
		case Gate.OR://OR
			j = wires[gate.a].connections.length;
			p = {x:gate.x-15,y:gate.y + 25};
			wires[gate.a].connections[j] = p;

			j = wires[gate.b].connections.length;
			p = {x:gate.x+15,y:gate.y + 25};
			wires[gate.b].connections[j] = p; 

			j = wires[gate.out].connections.length;
			p = {x:gate.x,y:gate.y+60};
			wires[gate.out].connections[j] = p;
			break;
		case Gate.XOR://XOR
			j = wires[gate.a].connections.length;
			p = {x:gate.x + 10,y:gate.y - 15};
			wires[gate.a].connections[j] = p;

			j = wires[gate.b].connections.length;
			p = {x:gate.x + 10,y:gate.y + 15};
			wires[gate.b].connections[j] = p; 

			j = wires[gate.out].connections.length;
			p = {x:gate.x + 60,y:gate.y};
			wires[gate.out].connections[j] = p;
			break;
		}
	});
	
	levers.forEach(function(lever) {
		l = lever.wire;
		j = wires[l].connections.length;
		p = {x:lever.x+15,y:lever.y+30};
		wires[l].connections[j] = p;
	});
	
	lamps.forEach(function(lamp) {
		l = lamp.wireIdx;
		j = wires[l].connections.length;
		p = {x:lamp.x+10,y:lamp.y};
		wires[l].connections[j] = p;
	});

	joins.forEach(function(join) {
		l = join.wire1;
		j = wires[l].connections.length;
		p = {x:join.x,y:join.y};
		wires[l].connections[j] = p;
		l = join.wire2;
		j = wires[l].connections.length;
		wires[l].connections[j] = p;
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