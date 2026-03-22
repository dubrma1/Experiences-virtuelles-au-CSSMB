var bougeFond=false;
var lastXB=-1,lastYB=-1;
function clic (x,y)
{
	xS=x;
	yS=y;
	//clic

	// barre de progression touchée ?
	var h=canvD.height-2;
	var l=canvD.width*0.3;
	var x0=canvD.width*0.01;
	var y0=Math.round(canvD.width*0.01);
	if ((x>x0)&&(x<(x0+l))&&(y>y0)&&(y<(y0+h)))
	{
		console.log ("prog");
		simpleRappelConsignes=true;
		afficheEtape();
		return false;
	}
	
	// si tablette => bactérie touchée ?
	if (is_touch_device)
	{
		var o,c;
		var x2=x/zF+xDec;
		var y2=y/zF+yDec;
		var seuil=xMax/200;
		// on vérifie si une bactérie est touchée
		c=4;
		for (var i=0;i<tObj[c].length;i++)
		{
			o=tObj[c][i];
			if (o.v)
			{
				if ((Math.abs(o.x-x2)<seuil)&&(Math.abs(o.y-y2)<seuil)) {
					tueBacille (c,i);
				}
			}
		}
		c=1;
		for (var i=0;i<tObj[c].length;i++)
		{
			o=tObj[c][i];
			if (o.v)
			{
				if ((Math.abs(o.x-x2)<seuil)&&(Math.abs(o.y-y2)<seuil)) {
					tueBacille (c,i);
				}
			}
		}
		c=11;
		for (var i=0;i<tObj[c].length;i++)
		{
			o=tObj[c][i];
			if (o.v)
			{
				if ((Math.abs(o.x-x2)<seuil)&&(Math.abs(o.y-y2)<seuil)) {
					tueBacille (c,i);
				}
			}
		}
		c=12;
		for (var i=0;i<tObj[c].length;i++)
		{
			o=tObj[c][i];
			if (o.v)
			{
				if ((Math.abs(o.x-x2)<seuil)&&(Math.abs(o.y-y2)<seuil)) {
					tueBacille (c,i);
				}
			}
		}
	}
}

function clicLeve(e)
{
	//message ("clic leve",1);
	//console.log ("clic leve");
	iSel=-1;
	nSel=-1;
	lastXB=-1;//bouge ecran
	lastYB=-1;
	boutonClic=false;
}

function clicSouris (e)
{
	cacheInfo();
	if (pause) {return false;}
	iSel=-1;
	nSel=-1;
	var x;
	var y;
	if (e.pageX || e.pageY) {
	x = e.pageX;
	y = e.pageY;
	}
	else {

		x = e.clientX; 
		y = e.clientY;  
	}

	x -= canv.offsetLeft;
	y -= canv.offsetTop;
	
	xS=x;
	yS=y;
	
	boutonClic=true;
	clic (x,y);
}

function doubleClic (cSel,nSel)
{
	cacheInfo();
	var o=tObj[cSel][nSel];
	o.fleche.v=false;
	if (((cSel==3)||(cSel==9))
	&&(o.degranule<=0))
	{
		// mastocyte ou plasmo
		o.xDeg=o.x;
		o.yDeg=o.y;
		o.degranule=degra;
		return false;
	}
}

function clicSouris2 (e)
{
	cacheInfo();
	if (pause) {return false;}
	var x;
	var y;
	if (e.pageX || e.pageY) {
	x = e.pageX;
	y = e.pageY;
	}
	else {

		x = e.clientX; 
		y = e.clientY;  
	}

	x -= canv.offsetLeft;
	y -= canv.offsetTop;
	
	xS=x;
	yS=y;
	
	if (!boutonClic)
	{
		boutonClic=true;
		this.dX=parseInt(this.style.left, 10);
		
		var tId=this.id.split(",");
		nSel=tId[1];
		iSel=tId[0];
		var o=tObj[iSel][nSel];
		
		if (o.sel) {
			var d=new Date().getTime();
			var t=d-o.lastClic;
			o.lastClic=d;
			
			if (t<250) {
				doubleClic(iSel,nSel);
				return false;
			}
	
		}
		
		//message (iSel+" "+nSel,0);
	}
	//console.log ("x="+x+" y="+y);
}

function toucheObjet (e)
{
	cacheInfo();
	if (pause) {return false;}
	boutonClic=true;
	iSel=-1;
	nSel=-1;
	
	var x;
	var y;
	event.preventDefault();
	
	x = event.targetTouches[0].pageX;
	y = event.targetTouches[0].pageY;
	
	x -= canv.offsetLeft;
	y -= canv.offsetTop;
	
	xS=x;
	yS=y;
	
	this.dX=parseInt(this.style.left, 10);
	
	var tId=this.id.split(",");
	nSel=tId[1];
	iSel=tId[0];
	var o=tObj[iSel][nSel];
	
	//message ('touche '+iSel,1);
	
	if (o.sel) {
		var d=new Date().getTime();
		var t=d-o.lastClic;
		o.lastClic=d;
		
		if (t<250) {
			doubleClic(iSel,nSel);
			return false;
		}

	}
		


}

function bougeClic (x,y)
{
	cacheInfo();
	boutonClic=true;
	//message ('bouge '+iSel,1);
	
	if ((iSel)<0) {
		// on clic & bouge hors d'un objet
		//if (!is_touch_device) {return false;}
		
		//message ('bouge ecran',1);
		if (lastXB<0) {
			lastXB=x;
			lastYB=y;
		}
		else {
			//on bouge l'écran car on touche hors d'un objet
			var maxXDec=(lTerr-lCanv)/zF;
			var maxYDec=(hTerr-hCanv)/zF;
			xDec+=(lastXB-x);
			if (xDec<0) {xDec=0;}
			else if (xDec>maxXDec) {xDec=maxXDec;}
			yDec+=(lastYB-y);
			if (yDec<0) {yDec=0;}
			else if (yDec>maxYDec) {yDec=maxYDec;}
			lastXB=x;
			lastYB=y;
			bougeFond=true;
		}
		return false;
	}
	
	if ((x>(lCanv-1))||(x<1)||(y>hCanv*0.95)||(y<1))
	{
		clicLeve();
		return false;
	}
	
	xS=x;
	yS=y;	
	//message ("bouge clic",1);
	// bouge clic
	//console.log ('bouge clic');
	//tCanv[parseInt(cSel)].style.left=x+"px";
	//tCanv[parseInt(cSel)].style.top=y+"px";
	var o=tObj[iSel][nSel];
	o.fleche.x=x/zF+xDec;
	o.fleche.y=y/zF+yDec;
	
	var irel=Math.round(o.fleche.x/xMax*100);
		
	if ((!o.sang) && (o.fleche.y>(yVaiss[irel]-margeVaiss)) ) {o.fleche.y=yVaiss[irel]-margeVaiss;}
	if ((!o.tissus)&&(o.fleche.y<(yVaiss[irel]+margeVaiss))) {o.fleche.y=yVaiss[irel]+margeVaiss;}
	
	if (o.fleche.y>yMax*0.95) {o.fleche.y=yMax*0.95;}
	o.fleche.v=true;
	rafrFleches();
}

function doTouchStart (event)
{
	cacheInfo();
	if (pause) {return false;}
	iSel=-1;
	nSel=-1;
	
	var x;
	var y;
	event.preventDefault();
	nb_clic=event.targetTouches.length;
	
	//for (var i=0;i<nb_clic;i++) // multi touch
	for (var i=0;i<1;i++) // un seul clic
	{
		x = event.targetTouches[i].pageX;
		y = event.targetTouches[i].pageY;
		
		xS=x;
		yS=y;
		
		clic (x,y);
	}
}

function doTouchMove (event)
{
	var targetEvent =  event.touches.item(0);
	var x= targetEvent.clientX;
	var y=targetEvent.clientY;
	event.preventDefault();
	bougeClic (x,y);
	return false;
}