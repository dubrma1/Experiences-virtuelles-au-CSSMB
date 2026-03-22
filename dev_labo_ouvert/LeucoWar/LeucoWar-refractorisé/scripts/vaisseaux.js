var lastMono=0;
var lastPlasmoSang=0;
var gradDia = new Array;
var yVaiss= new Array;
for (var i=0;i<=100;i++)
{
	gradDia[i]=0;
}

function dilateVaiss (j,r,v)
{
	for (var i=0;i<=100;i++)
	{
		var d=Math.sqrt((j-i)*(j-i))/30/r;
		var h=Math.exp(-d);
		gradDia[i]+=h/(1+gradDia[i])*v;
	}
}

function dilueGrad()
{
	for (var i=0;i<=100;i++)
	{
		gradDia[i]=gradDia[i]*0.99;
	}
}

function calcYVaisseau()
{
	var dy;
	for (var i=0;i<=100;i++)
	{
		dy=-gradDia[i]*yMax/15; 
		yVaiss[i]=Math.round(yMax*0.85+dy);
	}
}

function rafrVaisseau()
{
	var o=new Object();
	var y,dy,dw,irel;
	var nIm=5;
	for (var n=0;n<tObj[nIm].length;n++)
	{
		o=tObj[nIm][n];
		
		if ((temps%frameSkip)==0)
		{
			y=Math.round(-yDec+o.y-o.h/3);
			if (o.angle>0)
			{
				irel=Math.round(o.x/xMax*100);
				dw=1-gradDia[irel]/10;
				y=yVaiss[irel]-yDec-o.h*0.3;
				// rétrécit cellule
					if (vPre=="Webkit") {o.canv.style.webkitTransform="scale("+dw+",-1)";}
					else if (vPre=="Moz") {o.canv.style.MozTransform="scale("+dw+",-1)";}
					else if (vPre=="O") {o.canv.style.OTransform ="scale("+dw+",-1)";}
					else if (vPre=="ms") {o.canv.style.msTransform ="scale("+dw+",-1)";}
			}
						
			o.canv.style.left = Math.round((-xDec+o.x-o.l/2)*zF)+"px";
			o.canv.style.top = Math.round(y*zF)+"px";
		}
	} // for n

}

function creeVaisseau()
{
	var x,y;
	var nn;
	var nIm=5;

	var lCellEnd=tBase*tImages[nIm].tRel*0.75;
	var nCellEnd=Math.ceil(lTerr/lCellEnd)+1;
	var ratio=tImg[nIm].height/tImg[nIm].width;
	
	calcYVaisseau();
	
	for (var i=0;i<nCellEnd;i++)
	{
		x=i*lCellEnd;
		for (var j=0;j<2;j++)
		{
			if (j==0) {y=hTerr*0.7;} else {y=yMax-tBase*tImages[nIm].tRel*ratio/2;}
			
			tObj[nIm][i*2+j]=new Object();
			var o=tObj[nIm][i*2+j];
			
			o.nIm=nIm;
			o.v=true;
			o.age=0;
			o.l=Math.round(tBase*tImages[nIm].tRel*1.1/zF);
			o.h=Math.round(o.l*ratio);
			o.x=x;
			o.y=y;
			if (j==0) {o.angle=PI;} else {o.angle=0;}
			o.dangle=0;
			o.fleche=new Object();
			o.fleche.v=false;
			o.fleche.x=-1;
			o.fleche.y=-1;

			o.canv = document.createElement('canvas');
			nn=i*2+j;
			o.canv.id = nIm+","+nn;
			o.canv.width = o.l*zF;
			o.canv.height =o.h*zF;
			o.canv.style.zIndex = 5;
			o.canv.style.pointerEvents="none";
			o.canv.style.position = "absolute";
			o.canv.style.display ="block";
			o.sang=false;
			o.tissus=false;
			o.tourne=false;
			o.bouge=false;
			o.sel=false;
						
			document.body.appendChild(o.canv);
			o.ctx = o.canv.getContext('2d');
			o.ctx.drawImage(tCanv[nIm],0,0);
		}
	}
	rafrVaisseau();
}


function testMono()
{	
	var nIm=2;
	if (tObj[nIm].length==0) {return false;}
	lastMono++;
	if (lastMono>=tObj[nIm].length) {lastMono=0;}

	var o=tObj[nIm][lastMono];
	
	if (o.v)
	{
		var irel=Math.round(o.x/xMax*100);
		var d=(o.y-yVaiss[irel])/yMax;
		
		if ((!o.diap)&&(d<0.07)&&(gradDia[irel]>0.3))
		{
			if (Math.random()<((gradDia[irel]-0.4)*1))
			{
				o.diap=true;
				o.sel=false;
				o.fleche.v=false;
			}
		}	
	}
}

function testPlasmoSang()
{	
	var nIm=8;
	if (tObj[nIm].length==0) {return false;}
	lastPlasmoSang++;
	if (lastPlasmoSang>=tObj[nIm].length) {lastPlasmoSang=0;}

	var o=tObj[nIm][lastPlasmoSang];

	if (o.v)
	{
		var irel=Math.round(o.x/xMax*100);
		var d=(o.y-yVaiss[irel])/yMax;
		
		if ((!o.diap)&&(d<0.07)&&(gradDia[irel]>0.3))
		{
			if (Math.random()<((gradDia[irel]-0.4)*2))
			{
				o.diap=true;
				o.sel=false;
				o.fleche.v=false;
			}
		}	
	}
}

function diapedese (c,n)
{
	//console.log ('diap');
	var o=tObj[c][n];
	if (c==2) {	//monocyte
		creeNouveauObj(0,o.x,o.y);
		
	}
	if (c==8) { 
		var n=creeNouveauObj(9,o.x,o.y);
		var ac2=4; // ac anti bacilles 4
		var proba=cObj[11].n/(cObj[11].n+cObj[4].n+1);
		if ((etape>=10)&&(Math.random()<proba)) {ac2=11;} // anti trepo
		tObj[9][n].ac=ac2;
	
	}
	
	 // on réinjecte dans le sang
	o.age=0;
	o.x=0;
	o.y=Math.round(Math.random()*hTerr*0.1+hTerr*0.87);
	o.diap=0;
	o.sel=true;
	o.fleche.v=false;
}

function calcBaryMast (x,y)
{
	var nbDegra=0;
	var o;
	var nIm=3;
	var d2,inf;
	var angle,dx,dy,i;
	var lTerr2=xMax*xMax;
	dxb=0;
	dyb=0;
	for (i=0;i<tObj[nIm].length;i++)
	{
		o=tObj[nIm][i];
		if (o.degranule>0)
		{
			nbDegra++;
			dx=(o.xDeg-x);
			dy=(o.yDeg-y);
			angle = Math.atan2(dy,dx);
			d2=(dx*dx+dy*dy)/lTerr2+0.1;
			inf=1/d2;
			dxb+=Math.cos(angle)*inf;
			dyb+=Math.sin(angle)*inf;
		}
	}
	if (nbDegra==0) {pBaryMast=0;return false;}
	angleBaryMast = Math.atan2(dyb,dxb);
	pBaryMast=(dxb*dxb+dyb*dyb)/tObj[nIm].length/40;
	if (pBaryMast>1) {pBaryMast=1;}
	if (pBaryMast<0.005) {pBaryMast=0.005;}
	//console.log (pBaryMast);
}