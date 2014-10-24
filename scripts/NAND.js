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
	for(i=0;i<3;i++)
		wires[i] = new Wire();

	levers[0] = new Lever(8,10,0);
	levers[1] = new Lever(8,95,1);
	gates[0] = new Gate(NAND,100,80,0,1,2);

	lamps[0]= new Lamp(200,80,2);

	mapWires();
	update();
	update();
	update();
	update();
	update();
	drawFrame();
}
setup();
