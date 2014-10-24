var c = document.getElementById('gates')
  , ctx = c.getContext('2d');

c.onselectstart = function(){return false;}
ctx.font = "16px Arial";

module.exports = function(composite) {
	c.addEventListener('click', clickHandler.bind(undefined, composite), false);
}

module.exports.context = ctx;

function clickHandler(composite, e){
	 composite.checkAt(e.pageX-ctx.canvas.offsetLeft,e.pageY-ctx.canvas.offsetTop);
	 composite.update();
	 composite.update();
	 composite.update();
	 composite.update();
	 composite.update();
	 composite.update();
	 composite.render(ctx);
}