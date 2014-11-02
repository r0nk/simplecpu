module.exports = Join;

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