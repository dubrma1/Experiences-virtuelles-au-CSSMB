var boutonClic=false;
var vitBord=1;

function survol (x,y)
{
	document.body.style.cursor = "auto"; 
	
	// barre de progression survolée ?
	var h=canvD.height-2;
	var l=canvD.width*0.3;
	var x0=canvD.width*0.01;
	var y0=Math.round(canvD.width*0.01);
	if ((x>x0)&&(x<(x0+l))&&(y>y0)&&(y<(y0+h)))
	{
		document.body.style.cursor = "pointer"; 
	}
}

function survolEtape (e)
{
	var marge=canvT.height/20;
	var h=canvT.height-2*marge;
	var l=canvT.width-2*marge;
	var nIm=29;
	var lBouton=l/4;
	var hBouton=tImg[nIm].height/tImg[nIm].width*lBouton;
	var xBouton=(l-lBouton)/2+marge;
	var yBouton=h-hBouton+marge;
	
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

	x -= canvT.offsetLeft;
	y -= canvT.offsetTop;
	
	// au dessus bouton
	if ((x<(xBouton+lBouton))&&(x>xBouton)&&(y>yBouton)&&(y<(yBouton+hBouton)))
	{
		document.body.style.cursor = "pointer"; 
		return false;
	}
	
	var nIm=37;
	var lBouton=l/20;
	var hBouton=tImg[nIm].height/tImg[nIm].width*lBouton;
	var xBouton=l-lBouton*2;
	var yBouton=marge;
	
	// au dessus switch
	if ((etape==0)&&((x<(xBouton+lBouton))&&(x>xBouton)&&(y>yBouton)&&(y<(yBouton+hBouton))))
	{
		document.body.style.cursor = "pointer"; 
		return false;
	}
	document.body.style.cursor = "auto"; 
	return false;
}

function testBougeBord()
{
	var bouge=false;
	
	if (is_touch_device) {return false;}
	
	if ((antibio>0)||(pAntibio>0))
	{
		var xPast=lCanv-canvA.width*2;
		var yPast=canvA.height*2;
		if ((xS>xPast) && (yS<yPast)) {return false;}
	}
	
	// survole-t-on un bord ?
	var maxXDec=(lTerr-lCanv)/zF;
	var maxYDec=(hTerr-hCanv)/zF;
	if ((xS<lCanv*0.06)&&(xDec>0))
	{
		xDec-=vitBord/zF;
		bouge=true;
	}
	if ((yS<hCanv*0.06)&&(yDec>0))
	{
		yDec-=vitBord/zF;
		bouge=true;
	}
	if ((xS>(lCanv*0.94)&&(xDec<maxXDec)))
	{
		xDec+=vitBord/zF;
		bouge=true;
	}
	if ((yS>(hCanv*0.94)&&(yDec<maxYDec)))
	{
		yDec+=vitBord/zF;
		bouge=true;
	}
	if (bouge) {vitBord+=vit*2;} else {vitBord=vit;}
	
	if (xDec<0) {xDec=0;}
	else if (xDec>maxXDec) {xDec=maxXDec;}
	
	if (yDec<0) {yDec=0;}
	else if (yDec>maxYDec) {yDec=maxYDec;}
	
	bougeFond=true;
	
	return bouge;
}

function survolObjet(e)
{
	if (pause) {return false;}
	var tId=this.id.split(",");
	nId=tId[1];
	iId=tId[0];
	
	if ((iId==4)||(iId==1)||(iId==11)||(iId==12)) {document.body.style.cursor = "crosshair";}
	else if (tObj[iId][nId].sel) {document.body.style.cursor = "pointer"; } 
	else {document.body.style.cursor = "auto"; }
	
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
	
	if ((boutonClic)&&(nId!=nSel)&&(iId!=iSel))
	{
		// click and drag
        bougeClic(x,y);
		return false;
    }
	
	if (!boutonClic) {afficheInfo (iId,nId,x,y);}
	return false;
}

function survolSorti(e)
{
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
	
	//console.log (x+" "+y);
	
	cacheInfo();
	
	if ((x<1)||(y<1)||(x>(lCanv-1))||(y>hCanv*0.95))
	{
		clicLeve(e);
		return false;
	}
	return false;
}

function survolCanvas(e)
{
	document.body.style.cursor = "auto"; 
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
	

	if (boutonClic) 
	{
		// click and drag
        bougeClic(x,y);
		return false;
    }
	else
	{
		// survol sans clic
		survol(x,y);
		return false;
	}
}