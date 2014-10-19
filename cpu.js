var etfs = new Array();
var memory = new Array();//instruction pointer = 0;
var offset = 1;//memory selector location offset

var c = document.getElementById("cpu");
c.onselectstart = function(){return false;}
var ctx = c.getContext("2d");
ctx.font = "16px Arial";
setInterval(tick,1000);

c.addEventListener('click',function(e){
	ctx.font = "24px Arial";
	x=e.pageX-ctx.canvas.offsetLeft;
	y=e.pageY-ctx.canvas.offsetTop;
	if((x>105&&x<(105+ctx.measureText("00000000").width))&&(y>62&&y<270)){
		if(!(cpu.lever.value))
			modifyMemory(x-105,y-62);
	}
	if((x>340&&x<370)&&(y>90&&y<150)){
		cpu.lever.value = !cpu.lever.value;
	}
	update();
},false);
//firefox band-aid
var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

c.addEventListener(mousewheelevt,function(e){
	console.log(e.detail);
	if(e.wheelDelta){
		if(e.wheelDelta>0){
			if(offset>1)
				offset--;
		}else{
			if(offset<250)
				offset++;
		}
	}
	if(e.detail){
		if(e.detail<0){
			if(offset>1)
				offset--;
		}else{
			if(offset<250)
				offset++;
		}
	}
	for(k=0;k<6;k++){
		etfs[k].value = memory[offset+k];
		if((offset+k)==memory[0])
			etfs[k].type = 2;
		else
			etfs[k].type = 0;
			
	}
	etfs[1].value = memory[offset+1];
	etfs[2].value = memory[offset+2];
	etfs[3].value = memory[offset+3];
	etfs[4].value = memory[offset+4];
	etfs[5].value = memory[offset+5];
	cpu.etf.value = memory[0];
	drawFrame();
	return false;
},false);

//start of objects
function Cpu(x,y){
	//it does stuff.
	this.x = x;
	this.y = y;
	this.etf = new Etf(x+50,y+90,memory[0]);
	this.etf.type = 1;
	this.lever = new Lever(x+10,y+60,false);
}
function Lever(x,y,value){ 
	this.x = x;	
	this.y = y;	
	this.value = false;
}
function Etf(x,y,value){
	//Editable Text Field
	this.x = x;
	this.y = y;
	//types:
	//0 = default
	//1 = ip
	//2 = @(ip)
	this.type = 0;
	this.value = value;
}
//start of action functions
function modifyMemory(x,y){
	row = Math.floor(y/30);
	value = 128 >> Math.floor((x/ctx.measureText("0").width));
	memory[row+offset] = memory[row+offset]^value
}
function toBin(number){
	v = number;
	str = "";
	for(j=128;j>=1;j/=2){
		if(v>=j){
			str+="1";
			v-=j;
		}else{
			str+="0";
		}
	}
	return str;
}
function tick(){
	ip = memory[0];
	if(cpu.lever.value){
		switch(memory[ip]){
		case 1:
			memory[memory[ip+2]] += memory[memory[ip+1]];
			if(memory[memory[ip+2]]>255)
				memory[memory[ip+2]]=0;
			break;
		case 2:
			memory[memory[ip+2]] -= memory[memory[ip+1]];
			if(memory[memory[ip+2]]<0)
				memory[memory[ip+2]] = 0;
			break;
		case 3:
			memory[memory[ip+2]] = memory[memory[ip+1]];
			break;
		}
		memory[0]+=3;//instruction pointer++
		if(memory[0]>255)
			memory[0]=memory[0]-255;
	}
	for(k=0;k<6;k++){
		etfs[k].value = memory[offset+k];
		if((offset+k)==memory[0])
			etfs[k].type = 2;
		else
			etfs[k].type = 0;
			
	}
	etfs[1].value = memory[offset+1];
	etfs[2].value = memory[offset+2];
	etfs[3].value = memory[offset+3];
	etfs[4].value = memory[offset+4];
	etfs[5].value = memory[offset+5];
	cpu.etf.value = memory[0];
	drawFrame();
}
function update(){
	for(k=0;k<6;k++){
		etfs[k].value = memory[offset+k];
		if((offset+k)==memory[0])
			etfs[k].type = 2;
		else
			etfs[k].type = 0;
			
	}
	etfs[1].value = memory[offset+1];
	etfs[2].value = memory[offset+2];
	etfs[3].value = memory[offset+3];
	etfs[4].value = memory[offset+4];
	etfs[5].value = memory[offset+5];
	cpu.etf.value = memory[0];
	drawFrame();
}
//start of drawing fucntions
function drawEtf(etf){
	ctx.font = "24px Arial";
	wid = ctx.measureText("00000000").width + 8;
	ctx.setTransform(1,0,0,1,0,0);	
	ctx.fillStyle = "#FFFFFF"
	if(etf.type == 2)
		ctx.fillStyle = "#AAAAFF"
	ctx.fillRect(etf.x,etf.y,wid,30);
	ctx.strokeStyle = "#999999";
	ctx.strokeRect(etf.x,etf.y,wid,30);
	ctx.fillStyle = "#000000"
	if(etf.type == 1)
		ctx.fillStyle = "#0000FF"
	ctx.fillText(toBin(etf.value),etf.x+4,etf.y+24);
}
function drawAddresses(off){
	ctx.setTransform(1,0,0,1,0,0);	
	ctx.fillStyle = "#AAAAAA"
	ctx.font = "16px Arial";
	ctx.fillText(toBin(off),22,80);
	ctx.fillText(toBin(off+1),22,110);
	ctx.fillText(toBin(off+2),22,140);
	ctx.fillText(toBin(off+3),22,170);
	ctx.fillText(toBin(off+4),22,200);
	ctx.fillText(toBin(off+5),22,230);
}	
function drawLever(l){
	ctx.beginPath();
	ctx.font = "16px Arial";
	ctx.setTransform(1,0,0,1,l.x,l.y);	
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,30,60);
	if(l.value){
		ctx.fillStyle = "#AAFFAA";
		ctx.fillRect(0,30,30,30);
		ctx.fillStyle = "#000000";
		ctx.fillText("on",4,50);	
	}else{
		ctx.fillStyle = "#FFAAAA";
		ctx.fillRect(0,0,30,30);
		ctx.fillStyle = "#000000";
		ctx.fillText("off",4,20);	
	}
}
function drawCpu(c){
	ctx.fillStyle = "#DDDDDD";
	ctx.fillRect(c.x,c.y,190,190);
	ctx.strokeStyle = "#999999";
	ctx.strokeRect(c.x,c.y,190,190);
	ctx.font = "14px Arial";
	ctx.fillStyle = "#999999";
	ctx.fillText("Instruction Pointer:",c.x+45,c.y+85);	
	ctx.font = "16px Arial";
	ctx.fillStyle = "#999999";
	ctx.fillText("CPU",c.x,c.y-3);	
	drawLever(c.lever);
	drawEtf(c.etf);
}
function drawMemory(){
	ctx.fillStyle = "#DDDDDD";
	ctx.fillRect(20,30,220,220);
	ctx.strokeStyle = "#999999";
	ctx.strokeRect(20,30,220,220);
	for(i=0;i<etfs.length;i++){
		drawEtf(etfs[i]);
	}
	drawAddresses(offset);
	ctx.font = "16px Arial";
	ctx.fillStyle = "#999999";
	ctx.fillText("Memory",20,27);	
	ctx.font = "14px Arial";
	ctx.fillText("address:",23,55);	
	ctx.fillText("value:",105,55);	
}
function drawFrame(){
	ctx.setTransform(1,0,0,1,0,0);	
	ctx.clearRect(0,0,1000,1000);
	//draws everything onto the canvas 
	drawCpu(cpu);
	drawMemory();
	ctx.fillStyle = "#999999";
	ctx.font = "16px Arial";
	ctx.fillText("Bus",243,118);	
	ctx.fillStyle = "#DDDDDD";
	ctx.fillRect(240,120,90,10);
}
for(i=0;i<256;i++)
	memory[i] = 0;

memory[0]=1;

cpu = new Cpu(330,30);

etfs[0] = new Etf(105,60,memory[i]);
etfs[1] = new Etf(105,90,memory[i]);
etfs[2] = new Etf(105,120,memory[i]);
etfs[3] = new Etf(105,150,memory[i]);
etfs[4] = new Etf(105,180,memory[i]);
etfs[5] = new Etf(105,210,memory[i]);
update();
