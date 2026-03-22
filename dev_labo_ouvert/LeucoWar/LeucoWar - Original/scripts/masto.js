var pasDeCapDepuis=0;
var lastMasto=0;
var degra=300;
var degra1=degra-1;
var degra2=degra-3;
var degra3=degra-5;
var degra4=degra-7;
var degra5=degra-9;
var degra6=degra-11;
var degra7=degra-13;

var nIl=100;
var tAIl=new Array;
var tVIl=new Array;
var angleIl;
for (var i=0;i<100;i++)
{
	angleIl=Math.random()*2*Math.PI;
	tAIl[i]=angleIl;
	tVIl[i]=Math.random()*0.8+0.2;
}

var seuilMast=100000;
var angleBaryMast=-1;
//var dxBaryMast,dyBaryMast;
var pBaryMast=-1;

function rafrMasto()
{	
	var nIm=3;
	var angle,d,x,y,i,j;
	
	for (i=0;i<tObj[nIm].length;i++)
	{
		var o=tObj[nIm][i];
		if (o.degranule>0)
		{
			douleur+=0.15;
			o.degranule--;
			
			if (etape==4)
			{
				if ((o.xDeg>xDec)&&(o.xDeg<(xDec+xMax)))
				{
					progression+=0.25;
					if (progression>=100){
						tempsAvantEtape=0;
					}
				}
				else
				{
					progression+=0.1;
				}
			}
			
			if (o.degranule==0) {
				remplaceImage (nIm,i,nIm);
			}
			else if (o.degranule>=degra7)
			{
				if (o.degranule==degra1) {remplaceImage (nIm,i,14);}
				else if (o.degranule==degra2) {remplaceImage (nIm,i,15);}
				else if (o.degranule==degra3) {remplaceImage (nIm,i,16);}
				else if (o.degranule==degra4) {remplaceImage (nIm,i,17);}
				else if (o.degranule==degra5) {remplaceImage (nIm,i,18);}
				else if (o.degranule==degra6) {remplaceImage (nIm,i,19);}
				else if (o.degranule==degra7) {remplaceImage (nIm,i,20);}
			}

			var r=yMax*((degra+10)-o.degranule)/degra;
			var dMax=r;
			
			if ((temps%frameSkip)==0)
			{
				ctxM.save();
				ctxM.translate((o.xDeg-xDec)*zF,(o.yDeg-yDec)*zF);
				
				if (aura)
				{
					//aura
					var grd=ctxM.createRadialGradient(0,0,r*zF/8,0,0,r*zF);
					var opa=Math.round(o.degranule/degra/2*100)/100;
					grd.addColorStop(0,"rgba(255,0,0,"+opa+")");
					grd.addColorStop(1,"rgba(255,0,0,0)");
					
					ctxM.fillStyle=grd;
					
					ctxM.fillRect (-r*zF,-r*zF,r*2*zF,r*2*zF);
				}//aura
					
				if (true)
				{// nuage de molécules
					var taille=2*zF;
					ctxM.globalAlpha=1;
					ctxM.fillStyle="rgb(255,0,0)";
					
					for (j=0;j<nIl;j++)
					{
						angle=tAIl[j];
						
						d=tVIl[j]*dMax;
						
						x=d*Math.cos(angle)*zF;
						y=d*Math.sin(angle)*zF;
						
						ctxM.fillRect(x,y,taille,taille);
					}//j
				} // nuage d'IL
				ctxM.restore();
				
			}// frameSkip
			
			// influence vaisseaux
			var irel=Math.round(o.xDeg/xMax*100);
			var d=yVaiss[irel]-o.yDeg;
			
			var r2=r*2; // rayon plus grand que ce qu'on voit
			if (d<r2)
			{
				var v=(r2-d)/r2/40;
				if (v<0.01) {v=0.01;}
				var dilu=o.degranule/degra;
				dilateVaiss (irel,r2/yMax*0.7,v*dilu);
			}
		}
	}
}

function corrigeCapMasto (o)
{
	// on prend un bacille au hasard
	var n;
	var nIm;
	var coef=20;
	var v;
	var lTerr2=xMax*xMax;
	var ob;
	var pasDeCap=true;
		
	for (var i=0;i<5;i++)
	{
		n=Math.floor(Math.random()*nMaxBac);
		ob=tObj[1][n];
		if (ob.v)
		{
			pasDeCap=false;
			var d2=( (o.xattr-ob.x)*(o.xattr-ob.x)+(o.yattr-ob.y)*(o.yattr-ob.y) )/ lTerr2+0.05;
			var c2=1/d2/100;
			if (c2>1) {c2=1;}
			if (c2<0.01) {c2=0.01;}
			o.xattr=(o.xattr+ob.x*c2)/(c2+1);
			o.yattr=(o.yattr+ob.y*c2)/(c2+1);
		}
		ob=tObj[4][n];
		if (ob.v)
		{
			pasDeCap=false;
			d2=( (o.xattr-ob.x)*(o.xattr-ob.x)+(o.yattr-ob.y)*(o.yattr-ob.y) )/ lTerr2+0.05;
			c2=1/d2/200;
			if (c2>1) {c2=1;}
			if (c2<0.01) {c2=0.01;}
			o.xattr=(o.xattr+ob.x*c2)/(c2+1);
			o.yattr=(o.yattr+ob.y*c2)/(c2+1);
		}
		ob=tObj[11][n];
		if (ob.v)
		{
			pasDeCap=false;
			d2=( (o.xattr-ob.x)*(o.xattr-ob.x)+(o.yattr-ob.y)*(o.yattr-ob.y) )/ lTerr2+0.05;
			c2=1/d2/200;
			if (c2>1) {c2=1;}
			if (c2<0.01) {c2=0.01;}
			o.xattr=(o.xattr+ob.x*c2)/(c2+1);
			o.yattr=(o.yattr+ob.y*c2)/(c2+1);
		}
		ob=tObj[12][n];
		if (ob.v)
		{
			pasDeCap=false;
			d2=( (o.xattr-ob.x)*(o.xattr-ob.x)+(o.yattr-ob.y)*(o.yattr-ob.y) )/ lTerr2+0.05;
			c2=1/d2/200;
			if (c2>1) {c2=1;}
			if (c2<0.01) {c2=0.01;}
			o.xattr=(o.xattr+ob.x*c2)/(c2+1);
			o.yattr=(o.yattr+ob.y*c2)/(c2+1);
		}
		if (!pasDeCap) {break;}
	}
	if (pasDeCap) {pasDeCapDepuis++;} else {pasDeCapDepuis=0;}
	//console.log (pasDeCapDepuis);
	// on corrige le cap
	var angleAttr=Math.atan2((o.yattr-o.y),(o.xattr-o.x));
	var pcm=2/tObj[3].length;
	pcm=pcm*(1+pasDeCapDepuis/4);
	da=dAngle(o.angle,angleAttr);
	
	if (da<PI) {
		// moins de PI d'écart => sens trigo
		v=da/pcm;
		if (v>0.1) {v=0.1;}
		if (v<-0.1) {v=-0.1;}
		o.dangle+=v;
	}
	else
	{
		v=(2*PI-da)/pcm;
		if (v>0.1) {v=0.1;}
		if (v<-0.1) {v=-0.1;}
		o.dangle-=v;
	}				
}

function testMasto()
{
	var nIm=3;
	if (tObj[nIm].length==0) {return false;}
	lastMasto++;
	if (lastMasto>=tObj[nIm].length) {lastMasto=0;}
	
	var o=tObj[nIm][lastMasto];
	if (!o.v) {return false;}
	
	corrigeCapMasto (o);
	
	tot=calcInf(o.x,o.y,4);
	tot+=calcInf(o.x,o.y,1);
	tot+=calcInf(o.x,o.y,11);
	tot+=calcInf(o.x,o.y,12);
	tot+=calcInf(o.x,o.y,7); 
	
	//if (lastMasto==0) {console.log(tot+" s="+seuilMast);}
	//degranulation aléatoire ?
	if (((Math.random()*seuilMast+seuilMast)/tot<1)&&(o.degranule<=0)) {o.degranule=degra;o.xDeg=o.x;o.yDeg=o.y;seuilMast=seuilMast*2;} else {seuilMast=seuilMast*0.998+2;}
	//console.log (seuilMast);
}