module.exports = Lamp;

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
