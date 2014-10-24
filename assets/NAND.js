var gatesLib = require('./gates/index')
  , Gate = require('./gates/gate')
  , Wire = require('./gates/wire')
  , Lever = require('./gates/lever')
  , Lamp = require('./gates/lamp')
  , common = require('./util/common-setup')
  , ctx = common.getContext();

function setup(){
	for(i=0;i<3;i++) {
		gatesLib.wires[i] = new Wire();
	}

	gatesLib.levers[0] = new Lever(8,10,0);
	gatesLib.levers[1] = new Lever(8,95,1);

	gatesLib.gates[0] = new Gate(Gate.NAND,100,80,0,1,2);

	gatesLib.lamps[0]= new Lamp(200,80,2);

	gatesLib.mapWires();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.drawFrame(ctx);
}

setup();