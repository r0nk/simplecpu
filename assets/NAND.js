var gatesLib = require('./lib/gates')
  , common = require('./util/common-setup')
  , ctx = common.getContext();

function setup(){
	for(i=0;i<3;i++) {
		gatesLib.wires[i] = new gatesLib.Wire();
	}

	gatesLib.levers[0] = new gatesLib.Lever(8,10,0);
	gatesLib.levers[1] = new gatesLib.Lever(8,95,1);
	gatesLib.gates[0] = new gatesLib.Gate(gatesLib.NAND,100,80,0,1,2);

	gatesLib.lamps[0]= new gatesLib.Lamp(200,80,2);

	gatesLib.mapWires();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.drawFrame();
}

setup();