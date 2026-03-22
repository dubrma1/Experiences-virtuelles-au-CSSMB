pAntibio=-1;

function initAntibio()
{
	ctxA.clearRect (0,0,canvA.width,canvA.height);
	if (antibio>0)
	{
		var marge=canvA.height*0.2;
		var h=canvA.height-marge*2;
		var l=h;
		var ht=Math.round(l*0.6);
		ctxA.font=ht+"px "+mFont;
		ctxA.textAlign="center";	
		ctxA.fillStyle="white";
		ctxA.strokeStyle="black";
		ctxA.globalAlpha=0.5;
		ctxA.beginPath();
		ctxA.arc(canvA.width/2,canvA.height/2,l/2,0,2*PI);
		ctxA.closePath();
		ctxA.fill();
		ctxA.lineWidth=canvA.width/40;
		ctxA.stroke();
		ctxA.fillStyle="black";
		ctxA.fillText("A",canvA.width/2,canvA.height/2+ht*0.3);
	}
	else
	{canvA.style.pointerEvents="none";}
}

function survolAntibio(e)
{
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

	x -= canvT.offsetLeft;
	y -= canvT.offsetTop;
	if (antibio>0) {document.body.style.cursor = "pointer";afficheInfo ("-2",0,x,y); } else {canvA.style.pointerEvents="none";}
}

function admAntibio()
{
	if ((pause)||(antibio<=0)) {return false;}
	canvA.style.pointerEvents="none";
	antibio=0;
	//initAntibio();	
	pAntibio=200;
}

function rafrAntibio()
{
	if (pAntibio<=0) {return false;}
	
	if ((temps%frameSkip)==0)
	{
		var yBas=hTerr*0.85;
		var yBas2=hTerr;
		var pAntibio2=200-pAntibio;
		var ppAntibio=pAntibio2/2;
		if (ppAntibio>100) {ppAntibio=100;}
		else if (ppAntibio<0) {ppAntibio=0;}
		var yHaut=yBas-(hTerr*0.85)*ppAntibio/100;
		var yH=yHaut;
		
		//pastille tourne
		ctxA.clearRect (0,0,canvA.width,canvA.height);
		var opa=Math.round(0.5*pAntibio/200*100)/100;
		var marge=canvA.height*0.2;
		var h=canvA.height-marge*2;
		var l=h;
		var pcos=Math.cos(pAntibio2/5);
		var psin=Math.sin(pAntibio2/5);
		var psc=Math.abs(pcos);
		var pdec=psin*l/5
		
		var ht=Math.round(l*0.6);
		ctxA.font=ht+"px "+mFont;	
		
		ctxA.globalAlpha=opa;
		ctxA.lineWidth=canvA.width/40;
		ctxA.fillStyle="grey";
		ctxA.strokeStyle="black";
		
		//tranche
		if (psin>0)
		{
			ctxA.save();
			ctxA.translate(canvA.width/2-Math.abs(pdec),canvA.height/2);
			ctxA.scale(pcos,1);
			ctxA.beginPath();
			ctxA.arc(0,0,l/2,PI/2,3*PI/2,false);
			ctxA.restore();
			ctxA.lineTo(canvA.width/2+Math.abs(pdec),marge);
			ctxA.save();
			ctxA.translate(canvA.width/2+Math.abs(pdec),canvA.height/2);
			ctxA.scale(pcos,1);
			ctxA.arc(0,0,l/2,3*PI/2,PI/2,true);
			ctxA.restore();
			ctxA.lineTo(canvA.width/2-Math.abs(pdec),marge+h);
			ctxA.closePath();
			//ctxA.stroke();
			ctxA.fill();
		}
		else
		{
			ctxA.save();
			ctxA.translate(canvA.width/2+Math.abs(pdec),canvA.height/2);
			ctxA.scale(-pcos,1);
			ctxA.beginPath();
			ctxA.arc(0,0,l/2,PI/2,3*PI/2,false);
			ctxA.restore();
			ctxA.lineTo(canvA.width/2+Math.abs(pdec),marge);
			ctxA.save();
			ctxA.translate(canvA.width/2-Math.abs(pdec),canvA.height/2);
			ctxA.scale(-pcos,1);
			ctxA.arc(0,0,l/2,3*PI/2,PI/2,true);
			ctxA.restore();
			ctxA.lineTo(canvA.width/2+Math.abs(pdec),marge+h);
			ctxA.closePath();
			//ctxA.stroke();
			ctxA.fill();	
		}
		
		ctxA.textAlign="center";
		ctxA.save();
		ctxA.translate(canvA.width/2-pdec,canvA.height/2);
		ctxA.scale(psc,1);
		
		ctxA.fillStyle="white";
		ctxA.beginPath();

		if (pcos<0)
		{
			ctxA.arc(0,0,l/2,0,2*PI);
			ctxA.fill();
			ctxA.fillStyle="black";
			ctxA.fillText("A",0,ht*0.3);
		}

		

		ctxA.restore();
		//ctxA.stroke();
		
		
		ctxA.fillStyle="white";
		ctxA.save();
		ctxA.translate(canvA.width/2+pdec,canvA.height/2);
		ctxA.scale(psc,1);
		ctxA.beginPath();
		
		if (pcos>0)
		{
			ctxA.arc(0,0,l/2,0,2*PI);
			ctxA.fill();
			ctxA.fillStyle="black";
			ctxA.fillText("A",0,ht*0.3);
		}

		ctxA.restore();
		
		//contour global
		ctxA.save();
		ctxA.translate(canvA.width/2-Math.abs(pdec),canvA.height/2);
		ctxA.scale(psc,1);
		ctxA.beginPath();
		ctxA.arc(0,0,l/2,PI/2,3*PI/2,false);
		ctxA.restore();
		ctxA.lineTo(canvA.width/2+Math.abs(pdec),marge);
		ctxA.save();
		ctxA.translate(canvA.width/2+Math.abs(pdec),canvA.height/2);
		ctxA.scale(psc,1);
		ctxA.arc(0,0,l/2,3*PI/2,PI/2,false);
		ctxA.restore();
		ctxA.lineTo(canvA.width/2-Math.abs(pdec),marge+h);
		ctxA.closePath();
		ctxA.stroke();

		yBas-=yDec;
		yBas2-=yDec;
		yHaut-=yDec;
		
		var opaV=0.5*pAntibio2/50;
		if (opaV>0.5) {opaV=0.5;}
		
		if (pAntibio2>150)
		{
			opaV=0.5*(200-pAntibio2)/50;
		}
		opaV=Math.round(opaV*100)/100;	

		var grd=ctxM.createLinearGradient(0,yHaut,0,yBas);
		grd.addColorStop(0,"rgba(200,200,0,0)");
		grd.addColorStop(1,"rgba(200,200,0,"+opaV+")");
		ctxM.fillStyle=grd;
		ctxM.fillRect(0,yHaut,lCanv,yBas-yHaut);

		ctxM.fillStyle="rgba(200,200,0,"+opaV+")";
		ctxM.fillRect(0,yBas,lCanv,yBas2-yBas);
	} // fin affichage frameSkip
	
	// tue bactéries
	var yAntibio=yH/zF;
	for (j=0;j<2;j++)
	{
		var i=Math.floor(Math.random()*nMaxBac);
		if (tObj[4][i].y>yAntibio) {
		tueBacille(4,i);}
		if (tObj[1][i].y>yAntibio) {
		tueBacille(1,i);}
	}
	for (j=0;j<4;j++)
	{
		var i=Math.floor(Math.random()*nMaxBac);
		if (tObj[11][i].y>yAntibio) {
		tueBacille(11,i);}
		if (tObj[12][i].y>yAntibio) {
		tueBacille(12,i);}
	}
	pAntibio--;
}