var progression=0;
var douleur=0;
var douleurTot=0;
var infection=30;
var antibio=1;
function rafrBarreDouleur()
{
	var h=canvD.height-2;
	var l=canvD.width*0.3;
	var marge=canvD.width*0.01;
	var espace=h/15;
	var hd1=Math.round(h*0.25);
	var hd2=Math.round(hd1-espace*2);
	infection=Math.round((cObj[1].n/4+cObj[4].n+cObj[11].n+cObj[12].n/4)/nMaxBac*110);
	if ((etape==7)&&(infection<10)) {tempsAvantEtape=0;}
	if (infection>100) {infection=100;}
	douleurTot=infection/5+douleur+cObj[7].n/nMaxBac*8+cObj[10].n/6;
	if (douleurTot>100) {douleurTot=100;}
	
	var ht1=Math.round(h*0.3);
	var ht2=Math.round(h*0.25);
	var yt=hd1+ht1;
	ctxD.font="italic "+ht1+"px "+mFont;
	ctxD.textAlign="center";
	ctxD.lineWidth=hTerr/1000;
	
	ctxD.save();
	var x0=marge;
	ctxD.translate (x0+0.5,0.5);
	
	ctxD.clearRect(0,0,canvD.width,canvD.height);
	ctxD.strokeStyle="rgba(0,0,0,0.5)";
	ctxD.fillStyle="rgba(0,0,0,0.5)";
	ctxD.beginPath();
	ctxD.strokeRect(0,0,l,hd1);
	ctxD.stroke();
	ctxD.fillText("Objectif :",l/2,yt);
	ctxD.font="italic "+ht2+"px "+mFont;
	ctxD.fillText(objectif,l/2,yt+ht1);
	ctxD.fillStyle="rgba(100,100,100,0.5)";
	var ld=(l-espace*2)*progression/100;
	ctxD.fillRect (espace,espace,ld,hd2);
	ctxD.restore();

	ctxD.save();
	x0+=l+marge*2;
	ctxD.translate (x0+0.5,0.5);
	ctxD.strokeStyle="rgba(0,0,0,0.5)";
	ctxD.fillStyle="rgba(0,0,0,0.5)";
	ctxD.beginPath();
	ctxD.strokeRect(0,0,l,hd1);
	ctxD.stroke();
	ctxD.font="italic "+ht1+"px "+mFont;
	ctxD.fillText("Infection",l/2,yt);
	var g=Math.round((100-infection)*2);
	var r=Math.round(infection*2);
	ctxD.fillStyle="rgba("+r+","+g+",0,0.5)";
	ld=(l-espace*2)*infection/100;
	ctxD.fillRect (espace,espace,ld,hd2);
	ctxD.restore();
	
	ctxD.save();
	x0+=l+marge*2;
	ctxD.translate (x0+0.5,0.5);
	ctxD.strokeStyle="rgba(0,0,0,0.5)";
	ctxD.fillStyle="rgba(0,0,0,0.5)";
	ctxD.beginPath();
	ctxD.strokeRect(0,0,l,hd1);
	ctxD.stroke();
	if (etape==11) {progression=100-infection;}
	if (progression>100) {progression=100;}
	ctxD.fillText("Douleur",l/2,yt);
	g=Math.round((100-douleurTot)*2);
	r=Math.round(douleurTot*2);
	ctxD.fillStyle="rgba("+r+","+g+",0,0.5)";
	ld=(l-espace*2)*douleurTot/100;
	ctxD.fillRect (espace,espace,ld,hd2);
	ctxD.restore();

	if ((etape>=8)&&(infection<=0)) {finPartie(0);}
	else 	
	if (infection>=100)
	{
		finPartie(1);
	}	
	else
	if (douleurTot>=100)
	{
		finPartie(2);
	}
}