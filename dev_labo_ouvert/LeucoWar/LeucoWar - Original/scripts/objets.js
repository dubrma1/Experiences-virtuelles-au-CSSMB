var nSel=-1;
var iSel=-1;

function chercheLibre (nIm)
{
	var nt=tObj[nIm].length;
	var n=nt;
	
	for (var i=0;i<nt;i++)
	{
		if (!tObj[nIm][i].v) {
			n=i;
			break;
		}
	}
	return n;
}

function creeNouveauObj(c,x,y,age)
{
	var n=chercheLibre(c);
	var nIm=cObj[c].nIm;
	var nouveau=false;
	
	if (n==tObj[c].length) // il s'agit d'un nouvel objet
	{
		tObj[c][n]=new Object();
		nouveau=true;
	}		
	var o=tObj[c][n];
	
	if (nouveau)
	{
		o.canv = document.createElement('canvas');
		o.l=tCanv[nIm].width/zF;
		o.h=tCanv[nIm].height/zF;
		o.nIm=nIm;
		
		o.c=0.6; // célérité
		if ((c==4)||(c==11)){o.c=0.25;} // bactéries
		if ((c==1)||(c==12)) {o.c=0.1;} // bactéries ac
		if ((c==3)||(c==8)||(c==9)) {o.c=0.4;}
		if (c==6) {o.c=1;} //hématie
		
		o.sel=cObj[c].sel;
		
		if (o.sel)
		{
			o.canv.addEventListener("touchstart", toucheObjet, false);
			o.canv.addEventListener("touchend", clicLeve, false);
			o.canv.addEventListener("mousedown", clicSouris2, false);
			o.canv.addEventListener("mouseup", clicLeve, false);	
		}
		
		if ((c==4)||(c==1)||(c==11)||(c==12))
		{	
			//bacille
			o.canv.addEventListener("mousedown", ClicTueBacille, false);
		}

		o.canv.style.backfaceVisibility="hidden"; // facultatif ?
		
		if ((c==5)||(c==6)||(c==10)||(c==7))
		{
			// hématie ou endot ou mort
			o.canv.style.pointerEvents="none";
		}
		else
		{
				o.canv.addEventListener("mousemove", survolObjet, false);
				o.canv.addEventListener("mouseup", clicLeve, false);	
				o.canv.addEventListener("touchmove", doTouchMove, false);
				o.canv.addEventListener("touchend", clicLeve, false);
		}

		document.body.appendChild(o.canv);
		
		o.canv.id = c+","+n;
		o.canv.width = o.l*zF;
		o.canv.height =o.h*zF;
		o.canv.style.zIndex = 5;
		o.canv.style.position = "absolute";
		
		o.ctx = o.canv.getContext('2d');
		o.ctx.globalAlpha=1;
		o.ctx.drawImage(tCanv[nIm],0,0);
		
	}
	
		
	o.sang=(c==2)||(c==8)||(c==6);
	o.tissus=!o.sang;
	//o.tissus=(c==0)||(c==1)||(c==3)||(c==4)||(c==7)||(c==9)||(c==10)||(c==11);
	
	o.bouge=(c==0)||(c==1)||(c==2)||(c==3)||(c==4)||(c==6)||(c==8)||(c==9)||(c==11)||(c==12);
	o.tourne=o.bouge;
	
	if (age>=0) {o.age=age;}
	else
	{
		o.age=Math.round(Math.random()*longPlasmo/2);
		if (c==0) {o.age=Math.round(Math.random()*longMacro/3);}
		if (c==9) {o.age=Math.round(Math.random()*longPlasmo/3);}
		if (c==4) {o.age=Math.round(Math.random()*ageDiv);}
	}
	
	o.lastclic=new Date().getTime();
	
	if (c==3) {
		o.xattr=Math.round(Math.random()*(xMax-o.l));
		o.yattr=Math.round(Math.random()*(yMax*0.75-o.h));	
	}
	
	if ((c==3)||(c==9)) {
		o.degranule=0;
		o.xDeg=0;
		o.yDeg=0;
	}
	o.diap=false;
	o.phago=0;
	

	
	if (x>0)
	{o.x=x;}
	else
	{o.x=Math.round(Math.random()*(xMax-o.l));}
	
	if (y>0)
	{o.y=y;}
	else
	{
		if ((!o.sang)&&(o.tissus))
		{
			o.y=Math.round(Math.random()*(yMax*0.75-o.h));
		}
		else if ((o.sang)&&(o.tissus))
		{
			o.y=Math.round(Math.random()*(yMax-o.h));
		}
		else if ((o.sang)&&(!o.tissus))
		{
			o.y=Math.round(Math.random()*yMax*0.1+yMax*0.87);
		}
	}
	
	o.angle=Math.random()*PI*2;
	o.dangle=Math.random()*0.1;
	if (c==6) {o.dangle=Math.random()*5+0.5;}
	o.fleche=new Object();
	o.fleche.v=false;
	o.fleche.x=-1;
	o.fleche.y=-1;

	reveleCanv(o);
		
	return n;
}

function tueLeuco (c,n)
{
	var o=tObj[c][n];
	cacheCanv(o);
	o.fleche.v=false;
	if ((iSel==c)&&(nSel==n)) {iSel=-1;cSel=-1;}
	creeNouveauObj(10,o.x,o.y,0);
}

function remplaceImage (c,n,newIm)
{
	var o=tObj[c][n];
	o.ctx.clearRect (0,0,o.canv.width,o.canv.height);
	o.ctx.globalAlpha=1;
	o.ctx.drawImage(tCanv[newIm],0,0);
}