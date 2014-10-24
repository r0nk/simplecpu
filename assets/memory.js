var gatesLib = require('./gates/index')
  , Gate = require('./gates/gate')
  , Wire = require('./gates/wire')
  , Lever = require('./gates/lever')
  , Lamp = require('./gates/lamp')
  , Join = require('./gates/join')
  , common = require('./util/common-setup')
  , ctx = common.getContext();

function setup(){
	for(i=0;i<=12;i++) {
		gatesLib.wires[i] = new Wire();
	}

	gatesLib.joins[0] = new Join(55,175,1,2);
	gatesLib.joins[1] = new Join(100,145,4,5);
	gatesLib.joins[2] = new Join(173,50,3,4);
	gatesLib.joins[3] = new Join(210,80,9,8);
	gatesLib.joins[4] = new Join(210,130,10,7);
	gatesLib.joins[5] = new Join(305,65,11,10);
	gatesLib.joins[6] = new Join(305,145,12,9);

	gatesLib.gates[0] = new Gate(Gate.NAND,120,50,0,2,3);
	gatesLib.gates[1] = new Gate(Gate.NAND,120,160,5,1,6);
	gatesLib.gates[2] = new Gate(Gate.NAND,240,65,3,8,11);
	gatesLib.gates[3] = new Gate(Gate.NAND,240,145,7,6,12);

	gatesLib.levers[0] = new Lever(8,5,0);
	gatesLib.levers[1] = new Lever(8,145,1);

	gatesLib.lamps[0] = new Lamp(345,65,11);

	gatesLib.wires[1].value = true;
	gatesLib.mapWires();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.update();
	gatesLib.drawFrame(ctx);
}
setup();
