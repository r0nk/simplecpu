module.exports = Lever;

function Lever(x, y, wire){ 
	this.x = x;	
	this.y = y;	
	this.r = 0;
	this.s = 1;
	this.wire = wire;//wire index; not actually a wire
}

Lever.draw = function(ctx, wires, lever){
	ctx.beginPath();
	ctx.setTransform(lever.s, 0, 0, lever.s, lever.x, lever.y);	
	ctx.rotate(lever.r*(Math.PI/180));
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, 30, 60);
	if(wires[lever.wire].value){
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