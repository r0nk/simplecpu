module.exports = Wire;

function Wire(){
	//one value and an array of entities the wire is connected to.
	this.value = false;
	this.connections = new Array();
}	

Wire.draw = function(ctx, wire){
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