(function(global) {
	
	/**=================*
	 * Wires
	 *==================*/

	function Wire(){
		//one value and an array of entities the wire is connected to.
		this.value = false;
		this.connections = [];
	}	

	Wire.list = function(num) {
		return Array.apply(null, new Array(num)).map(function() { return new Wire(); });
	}

	Wire.draw = function(wire, ctx){
		//for simplicities sake, it only draws one line, 
		//however, the wire may be connected to more,
		//this is usefull in the case of joins in the middle of a wire.
		if(wire.value){
			ctx.strokeStyle = "#00AA00";
			ctx.lineWidth = 4;
			ctx.beginPath();
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.moveTo(wire.connections[0].x, wire.connections[0].y);
			ctx.lineTo(wire.connections[1].x, wire.connections[1].y);
			ctx.stroke();
			ctx.strokeStyle = "#FFFFFF";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.moveTo(wire.connections[0].x, wire.connections[0].y);
			ctx.lineTo(wire.connections[1].x, wire.connections[1].y);
			ctx.stroke();
			ctx.lineWidth = 1;
		}else{
			ctx.strokeStyle = "#FF0000";
		}
		ctx.beginPath();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.moveTo(wire.connections[0].x, wire.connections[0].y);
		ctx.lineTo(wire.connections[1].x, wire.connections[1].y);
		ctx.stroke();
		ctx.strokeStyle = "#000000";
	}

	/**=================*
	 * Levers
	 *==================*/

	function Lever(x, y, wire){ 
	 	this.x = x;	
	 	this.y = y;	
	 	this.r = 0;
	 	this.s = 1;
	 	this.wire = wire;
	}

	Lever.draw = function(lever, ctx){
	 	ctx.beginPath();
	 	ctx.setTransform(lever.s, 0, 0, lever.s, lever.x, lever.y);	
	 	ctx.rotate(lever.r*(Math.PI/180));
	 	ctx.fillStyle = "#000000";
	 	ctx.fillRect(0, 0, 30, 60);
	 	if (lever.wire.value){
	 		ctx.fillStyle = "#AAFFAA";
	 		ctx.fillRect(0, 30, 30, 30);
	 		ctx.fillStyle = "#000000";
	 		ctx.fillText("on", 4, 50);	
	 	}else{
	 		ctx.fillStyle = "#FFAAAA";
	 		ctx.fillRect(0, 0, 30, 30);
	 		ctx.fillStyle = "#000000";
	 		ctx.fillText("off", 4, 20);	
	 	}
	}

	/**=================*
	 * Lamps
	 *==================*/

	function Lamp(x,y,wire){
	 	this.x = x;	
	 	this.y = y;	
	 	this.r = 0;
	 	this.s = 1;
	 	this.wire = wire;
	}

	Lamp.draw = function(lamp, ctx){
	 	ctx.beginPath();
	 	ctx.setTransform(lamp.s, 0, 0, lamp.s, lamp.x, lamp.y - 10);	
	 	if(lamp.wire.value){
	 		grd = ctx.createRadialGradient(10, 10, 0, 10, 10, 20);
	 		grd.addColorStop(0, "rgba(100, 255, 100, 1.0)");
	 		grd.addColorStop(1, "rgba(100, 255, 100, 0.0)");
	 		ctx.fillStyle = grd;
	 		ctx.fillRect(-10, -10, 40, 40);
	 		ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
	 		ctx.fillRect(0, 0, 20, 20);
	 		ctx.fillStyle = "#88FF88";
	 		ctx.fillText("on", 0, 15);
	 	}else{
	 		ctx.fillStyle = "#BBBBBB";
	 		ctx.fillRect(0, 0, 20, 20);
	 		ctx.fillStyle = "#888888";
	 		ctx.fillText("off", 0, 15);	
	 	}	
	 	ctx.stroke();
	 	ctx.fillStyle = "#000000";
	}

	/**=================*
	 * Joins
	 *==================*/
	 
	function Join(x,y,wire1,wire2){
	 	this.x = x;
	 	this.y = y;
	 	this.wire1 = wire1;
	 	this.wire2 = wire2;
	}

	Join.draw = function(join, ctx){
	 	ctx.beginPath();
	 	ctx.setTransform(1, 0, 0, 1, join.x-2, join.y-2);	
	 	if(join.wire1.value){
	 		ctx.fillStyle = "#00AA00";
	 		ctx.fillRect(-1, -1, 6, 6);
	 		ctx.fillStyle = "#FFFFFF";
	 	}else{
	 		ctx.fillStyle = "#FF0000";
	 	}
	 	ctx.fillRect(0, 0, 4, 4);
	 	ctx.fillStyle = "#000000";
	}

	/**=================*
	 * Gates
	 *==================*/

	Gate.NAND  = 0;
	Gate.AND   = 1;
	Gate.OR    = 2;
	Gate.XOR   = 3;
	Gate.tNAND = 4;

	function Gate(kind,x,y,wireIn1,wireIn2,wireOut){
		this.kind = kind;
		this.x = x;
		this.y = y;
		this.r = 0;
		this.s = 1;
		
		this.wireIn1 = wireIn1;
		this.wireIn2 = wireIn2;
		this.wireOut = wireOut;
	}

	Gate.draw = function(gate, ctx){
		ctx.strokeStyle = "#000000";
		ctx.beginPath();
		ctx.setTransform(1, 0, 0, 1, gate.x, gate.y);	
		switch(gate.kind){
		case Gate.tNAND:
			ctx.strokeStyle = "#BBBBBB";
		case Gate.NAND:
			ctx.rotate(gate.r*(Math.PI/180));
			ctx.arc(0, 0, 30, 0-(Math.PI/2), Math.PI/2);
			ctx.closePath();
			ctx.moveTo(45, 0);
			ctx.arc(37, 0, 7, 0, Math.PI*2);
			break;
		case Gate.AND:
			ctx.lineTo(30, 0);	
			ctx.arc(0, 30, 30, 0, Math.PI);
			ctx.lineTo(-30, 0);	
			ctx.closePath();
			break;
		case Gate.OR:
			ctx.arc(0, 0, 30, 0, Math.PI);
			ctx.moveTo(30, 0);	
			ctx.arc(0, 30, 30, 0, Math.PI);
			ctx.lineTo(-30, 0);	
			break;
		case Gate.XOR:
			ctx.arc(0, 0, 30, 0-(Math.PI/2), Math.PI/2);
			ctx.moveTo(30, -30);
			ctx.lineTo(0, -30);
			ctx.arc(30, 0, 30, 0-(Math.PI/2), Math.PI/2);
			ctx.moveTo(30, 30);
			ctx.lineTo(0, 30);
			ctx.moveTo(-6, -30);
			ctx.arc(-15, 0, 30, 0-(Math.PI/2)+0.3, Math.PI/2-0.3);
			break;
		}
		ctx.stroke();
	}

	/**=================*
	 * Composite
	 *==================*/

	function createComposite(gates, joins, lamps, levers, wires, drawComments){
		drawComments = drawComments || function() {};
		
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
	}

	/**=================*
	 * Common page setup
	 *==================*/
	
	var canvasEl = document.getElementById('gates')
	  , ctx = canvasEl.getContext('2d');

	canvasEl.onselectstart = function(){return false;}
	ctx.font = "16px Arial";

	var setup = function(composite) {
		canvasEl.addEventListener('click', function clickHandler(evt) {
			composite.checkAt(evt.pageX-ctx.canvas.offsetLeft,evt.pageY-ctx.canvas.offsetTop);
			composite.update();
			composite.update();
			composite.update();
			composite.update();
			composite.update();
			composite.update();
			composite.render(ctx);
		}, false);
	}

	// global simpleCpu object
	global.simpleCpu = {
		composite: createComposite,
    Gate: Gate,
    Wire: Wire,
    Lever: Lever,
    Lamp: Lamp,
    Join: Join,
    setup: setup,
    context: ctx
	};
})(window);