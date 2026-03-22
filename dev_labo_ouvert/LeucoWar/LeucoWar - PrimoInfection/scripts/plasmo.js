var lastPlasmo=0;
var longPlasmo=2500;
var seuilPlasm=1000000;
var nAnti=30;
var tAAnti=new Array;
var tVAnti=new Array;
var tPtsAnti=new Array;
// precalcul des points des anticorps
var angleAnti;
var lAnti=yMax/200;
for (var i=0;i<100;i++)
{
	angleAnti=Math.random()*2*Math.PI;
	tAAnti[i]=angleAnti;
	tPtsAnti[i]=new Array();
	tPtsAnti[i][0]=new Object();
	tPtsAnti[i][1]=new Object();
	tPtsAnti[i][2]=new Object();
	angleAnti+=Math.PI;
	tPtsAnti[i][0].x=lAnti*Math.cos(angleAnti);
	tPtsAnti[i][0].y=lAnti*Math.sin(angleAnti);
	angleAnti+=Math.PI*2/3;
	tPtsAnti[i][1].x=lAnti*Math.cos(angleAnti);
	tPtsAnti[i][1].y=lAnti*Math.sin(angleAnti);
	angleAnti+=Math.PI*2/3;
	tPtsAnti[i][2].x=lAnti*Math.cos(angleAnti);
	tPtsAnti[i][2].y=lAnti*Math.sin(angleAnti);
	tVAnti[i]=Math.random()*0.8+0.2;
}

function rafrPlasmo()
{	
	var nIm=9;
	var angle,d,x,y,i,j;
	var d=0;
	var dMax=0;
	
	for (i=0;i<tObj[nIm].length;i++)
	{
		var o=tObj[nIm][i];
		if (o.degranule>0)
		{
			o.degranule--;
			
			var rMax=yMax;
			var r=rMax*(degra-o.degranule)/degra;
			
			if ((temps%frameSkip)==0)
			{
				ctxM.save();
				ctxM.translate((o.xDeg-xDec)*zF,(o.yDeg-yDec)*zF);
				
				if (aura)
				{
					var grd=ctxM.createRadialGradient(0,0,r/8*zF,0,0,r*zF);
					var opa=Math.round(o.degranule/degra/2*100)/200;
					if (o.ac==4) {
						grd.addColorStop(0,"rgba(0,0,255,"+opa+")");
						grd.addColorStop(1,"rgba(0,0,255,0)");
					}
					else {
						grd.addColorStop(0,"rgba(0,127,0,"+opa+")");
						grd.addColorStop(1,"rgba(0,127,0,0)");			
					}
					
					//ctxM.globalAlpha=opa;
					ctxM.fillStyle=grd;
					
					ctxM.fillRect (-r*zF,-r*zF,r*2*zF,r*2*zF);
				}
				
	
				if (true)
				{// nuage d'anticorps
					ctxM.lineWidth=1;
					ctxM.globalAlpha=0.5;
					if (o.ac==4)
					{ctxM.strokeStyle="rgb(0,0,255)";}
					else
					{ctxM.strokeStyle="rgb(0,127,0)";}
										
					dMax=r*zF;
					
					ctxM.beginPath();
					for (j=0;j<nAnti;j++)
					{
						angle=tAAnti[j];
						
						d=tVAnti[j]*dMax;
						
						x=d*Math.cos(angle);
						y=d*Math.sin(angle);
						
						
						ctxM.moveTo(x+tPtsAnti[j][0].x*zF,y+tPtsAnti[j][0].y*zF);
						ctxM.lineTo(x,y);
						ctxM.lineTo(x+tPtsAnti[j][1].x*zF,y+tPtsAnti[j][1].y*zF);
						ctxM.moveTo(x,y);
						ctxM.lineTo(x+tPtsAnti[j][2].x*zF,y+tPtsAnti[j][2].y*zF);
						//ctxM.fillRect(0,0,1,1);
					}
					ctxM.stroke();
				}
				
				ctxM.restore();
			} // temps%frameskip
		}
	}
}

function testPlasmo()
{
	var nIm=9;
	if (tObj[nIm].length==0) {return false;}
	lastPlasmo++;
	if (lastPlasmo>=tObj[nIm].length) {lastPlasmo=0;}
	
	var o=tObj[nIm][lastPlasmo];
	if (!o.v) {return false;}
	if (o.age>longPlasmo) {tueLeuco(nIm,lastPlasmo);return false;}
	tot=calcInf(o.x,o.y,o.ac);

	//degranulation aléatoire ?
	if (((Math.random()*seuilPlasm)/tot<1)&&(o.degranule<=0)) {o.xDeg=o.x;o.yDeg=o.y;o.degranule=degra;seuilPlasm=seuilPlasm*1.5;} else {seuilPlasm=seuilPlasm*0.999+1;}
}