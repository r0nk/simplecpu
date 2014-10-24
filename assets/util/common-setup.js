var gatesLib = require('../gates/index')
  , ctx = null;

function clicker(e){
	 gatesLib.checkAt(e.pageX-ctx.canvas.offsetLeft,e.pageY-ctx.canvas.offsetTop);
	 gatesLib.update();
	 gatesLib.update();
	 gatesLib.update();
	 gatesLib.update();
	 gatesLib.update();
	 gatesLib.update();
	 gatesLib.drawFrame(ctx);
}

exports.getContext = function() {
	if (ctx) return ctx;

	c = document.getElementById("gates");
	
	c.onselectstart = function(){return false;}
	ctx = c.getContext("2d");
	ctx.font = "16px Arial";

	c.addEventListener('click',clicker,false);

	return ctx;
}