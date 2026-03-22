var pauseAvant=false;
var redimEnCours=false;
var resiz;

function testRedim()
{
	if ((lCanv!=window.innerWidth)||(hCanv!=window.innerHeight))
	{
		redim();
	}
}

export function redim(tImg, tCanv) { // On ajoute aussi tCanv qui sera sûrement nécessaire
    redimOK = true;
    lCanv = window.innerWidth;
    hCanv = window.innerHeight;

    redimCanvas();
    creeTCanv(false); // La fonction creeTCanv devra aussi être importée ou déplacée

	
	ctx.clearRect(0,0,lCanv,hCanv);
	ctxM.clearRect(0,0,lCanv,hCanv);
	ctxT.clearRect(0,0,canvT.width,canvT.height);

	// affichage du message de patience
	var marge=canvT.height/20;
	var h=canvT.height-2*marge;
	var l=canvT.width-2*marge;
	var x=marge;
	// cadre
	ctxT.fillStyle="rgb(240,240,240)";
	ctxT.fillStyle="white";
	ctxT.fillRect(0,0,canvT.width,canvT.height);
	ctxT.fillStyle="rgb(100,100,100)";
	ctxT.fillRect(0,0,2,canvT.height);
	ctxT.fillRect(canvT.width-2,0,2,canvT.height);
	ctxT.fillRect(0,0,canvT.width,2);
	ctxT.fillRect(0,canvT.height-2,canvT.width,2);
	// arc en ciel appelant à la patience
	ctxT.globalAlpha=0.5;
	ctxT.drawImage(tImg[34],0,0,tImg[34].width,tImg[34].height,2,2,canvT.width-4,canvT.height-4);
	ctxT.globalAlpha=1;
	//texte
	ctxT.fillStyle="black";
	var ht=Math.round(h/20);
	ctxT.font="bold italic "+ht+"px "+mFont;
	var y=marge+ht*0.7;
	y=wrapText(ctxT,"Les dimensions du navigateur ont changé.", x, y, l, ht*1.5) ;
	y+=ht*3;
	ctxT.font=ht+"px "+mFont;
	y=wrapText(ctxT,"Veuillez patienter !", x, y, l, ht*1.5) ;
	
	y+=ht*2;
	ctxT.font=ht+"px "+mFont;
	y=wrapText(ctxT,"Nouvelle largeur : "+lCanv+"px", x, y, l, ht*1.5) ;
	
	ctxT.fillStyle="rgba(0,0,0,0.25)";
	ctxT.fillRect (canvT.width/2-20,canvT.height/2-20,40,40);
	
	canvT.style.display="block";

	
	setTimeout(redim2,10);
}

function redim2()
{
	creeTCanv(false);
	redrawAllCanv();
	initAntibio();

	canvT.style.display="none";
	afficheAuteur ();
	anim();
	
	if (etapeAffiche) {
		afficheEtape();
	}
	else if (!pauseAvant)
	{	
		startAnim(); 
	}

	canvAuteur.style.display="block";
	redimEnCours=false;
}