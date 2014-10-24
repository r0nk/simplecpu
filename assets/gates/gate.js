module.exports = Gate;

Gate.NAND  = 0;
Gate.AND   = 1;
Gate.OR    = 2;
Gate.XOR   = 3;
Gate.tNAND = 4;

function Gate(kind,x,y,a,b,out){
	this.kind = kind;
	this.x = x;
	this.y = y;
	this.r = 0;
	this.s = 1;
	//a,b, and out are all input and output wires; they are the index 
	//location of the wire.
	this.a = a;
	this.b = b;
	this.out = out;
}

Gate.draw = function(ctx, gate){
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
