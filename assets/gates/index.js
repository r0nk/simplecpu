var Gate = require('./gate')
  , Wire = require('./wire')
  , Lever = require('./lever')
  , Lamp = require('./lamp')
  , Join = require('./join');

//main(only) library file
var lamps = exports.lamps  = new Array();
var levers = exports.levers = new Array(); 
var gates = exports.gates  = new Array();
var joins = exports.joins  = new Array();
var wires = exports.wires  = new Array();

window.drawComments = function() {}

var mapWires = exports.mapWires = function(){
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
}

var checkAt = exports.checkAt = function(x,y){
	levers.forEach(function(lever) {
		if(x > lever.x && x < (lever.x + 30)){
		 if(y > lever.y && y < (lever.y + 60)){
		  wires[lever.wire].value = !wires[lever.wire].value;
		 }
		}
	});
}

var gateStep = exports.gateStep = function(){
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

var joinStep = exports.joinStep = function(){
	joins.forEach(function(join) {
		a = join.wire1;
		b = join.wire2;
		wires[b].value = wires[a].value 
	});
}

var update = exports.update = function(){
	gateStep();
	//joinStep has to be last
	joinStep();
}

var drawFrame = exports.drawFrame = function(ctx){
	ctx.setTransform(1,0,0,1,0,0);	
	ctx.clearRect(0,0,1000,1000);

	wires.forEach(function(wire) {
		Wire.draw(ctx, wire);
	});

	lamps.forEach(function(lamp) {
		Lamp.draw(ctx, wires, lamp);
	});

	levers.forEach(function(lever) {
		Lever.draw(ctx, wires, lever);
	});

	gates.forEach(function(gate) {
		Gate.draw(ctx, gate);
	});

	joins.forEach(function(join) {
		Join.draw(ctx, wires, join);
	});

	drawComments();
}
