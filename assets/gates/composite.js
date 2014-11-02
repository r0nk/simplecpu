var Gate = require('./gate')
  , Wire = require('./wire')
  , Lever = require('./lever')
  , Lamp = require('./lamp')
  , Join = require('./join');

window.drawComments = function(ctx) {}

module.exports = function(gates, joins, lamps, levers, wires){
	//reads through array of all elements, and maps locations to the wire
	//array
	//only called once after the arrays of elements are mapped
	gates.forEach(function(gate) {
		switch(gate.kind){
		case Gate.tNAND:
		case Gate.NAND:
			gate.wireIn1.connections.push({x:gate.x,y:gate.y - 15});
			gate.wireIn2.connections.push({x:gate.x,y:gate.y + 15}); 
			gate.wireOut.connections.push({x:gate.x + 43,y:gate.y});
			break;
		case Gate.AND://AND
			gate.wireIn1.connections.push({x:gate.x-15,y:gate.y});
			gate.wireIn2.connections.push({x:gate.x+15,y:gate.y}); 
			gate.wireOut.connections.push({x:gate.x,y:gate.y+60});
			break;
		case Gate.OR://OR
			gate.wireIn1.connections.push({x:gate.x-15,y:gate.y + 25});
			gate.wireIn2.connections.push({x:gate.x+15,y:gate.y + 25}); 
			gate.wireOut.connections.push({x:gate.x,y:gate.y+60});
			break;
		case Gate.XOR://XOR
			gate.wireIn1.connections.push({x:gate.x + 10,y:gate.y - 15});
			gate.wireIn2.connections.push({x:gate.x + 10,y:gate.y + 15}); 
			gate.wireOut.connections.push({x:gate.x + 60,y:gate.y});
			break;
		}
	});
	
	levers.forEach(function(lever) {
		lever.wire.connections.push({x:lever.x+15,y:lever.y+30});
	});
	
	lamps.forEach(function(lamp) {
		lamp.wire.connections.push({x:lamp.x+10,y:lamp.y});
	});

	joins.forEach(function(join) {
		join.wire1.connections.push({x:join.x, y:join.y});
		join.wire2.connections.push({x:join.x, y:join.y});
	});

	return {
		checkAt: checkAt.bind(undefined, levers),
		update: update.bind(undefined, gates, joins),
		render: drawFrame.bind(undefined, gates, wires, joins, lamps, levers)
	};
}

function checkAt(levers, x, y){
	levers.forEach(function(lever) {
		if(x > lever.x && x < (lever.x + 30)){
		 if(y > lever.y && y < (lever.y + 60)){
		  lever.wire.value = !lever.wire.value;
		 }
		}
	});
}

function update(gates, joins){
	//calculate gate logic
	gates.forEach(function(gate) {
		switch(gate.kind){
		case Gate.tNAND:
		case Gate.NAND:
			gate.wireOut.value = !(gate.wireIn1.value && gate.wireIn2.value);
			break;
		case Gate.AND:
			gate.wireOut.value = (gate.wireIn1.value && gate.wireIn2.value);
			break;
		case Gate.OR:
			gate.wireOut.value = (gate.wireIn1.value || gate.wireIn2.value);
			break;
		case Gate.XOR:
			gate.wireOut.value = (gate.wireIn1.value != gate.wireIn2.value);
			break;
		}
	});

	joins.forEach(function(join) {
		join.wire2.value = join.wire1.value 
	});
}

function drawFrame(gates, wires, joins, lamps, levers, ctx){
	ctx.setTransform(1,0,0,1,0,0);	
	ctx.clearRect(0,0,1000,1000);

	wires.forEach(function(wire) {
		Wire.draw(wire, ctx);
	});

	lamps.forEach(function(lamp) {
		Lamp.draw(lamp, ctx);
	});

	levers.forEach(function(lever) {
		Lever.draw(lever, ctx);
	});

	gates.forEach(function(gate) {
		Gate.draw(gate, ctx);
	});

	joins.forEach(function(join) {
		Join.draw(join, ctx);
	});

	drawComments(ctx);
}