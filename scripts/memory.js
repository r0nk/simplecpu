function clicker(e){
	 checkAt(e.pageX-ctx.canvas.offsetLeft,e.pageY-ctx.canvas.offsetTop);
	 update();
	 update();
	 update();
	 update();
	 update();
	 update();
	 drawFrame();
}

function drawComments(){
}
function setup(){
	//standard setup
	c = document.getElementById("gates");
	c.onselectstart = function(){return false;}
	ctx = c.getContext("2d");
	ctx.font = "16px Arial";

	c.addEventListener('click',clicker,false);
	//page unique setup
	for(i=0;i<=12;i++)
		wires[i] = new Wire();
	joins[0] = new Join(55,175,1,2);
	joins[1] = new Join(100,145,4,5);
	joins[2] = new Join(173,50,3,4);
	joins[3] = new Join(210,80,9,8);
	joins[4] = new Join(210,130,10,7);
	joins[5] = new Join(305,65,11,10);
	joins[6] = new Join(305,145,12,9);

	gates[0] = new Gate(NAND,120,50,0,2,3);
	gates[1] = new Gate(NAND,120,160,5,1,6);
	gates[2] = new Gate(NAND,240,65,3,8,11);
	gates[3] = new Gate(NAND,240,145,7,6,12);

	levers[0] = new Lever(8,5,0);
	levers[1] = new Lever(8,145,1);

	lamps[0] = new Lamp(345,65,11);

	wires[1].value = true;
	mapWires();
	update();
	update();
	update();
	update();
	update();
	drawFrame();
}
setup();
