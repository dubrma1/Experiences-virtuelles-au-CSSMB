// On exporte cette fonction pour la rendre disponible
export function wheel(event) {
    event.preventDefault();
    event.returnValue = false;
}

// On renomme "clavier" en "handleKeyDown" pour plus de clarté
// et on l'exporte aussi.
export function handleKeyDown(e) {
    let touche = ((e.which) || (e.keyCode));
	
	if (e.altKey && touche == 78) { // alt+N
		afficheEtape();
	}
	
	if (touche==70)
	{
		fsMin++;
		if (fsMin>fsMax) {fsMin=1;}
		frameSkip=fsMin;
	}
	
	if ((e.altKey)&&(touche==65))
	{
		var x=xS+xDec;
		var y=yS+yDec;
		var r=1000;
		for (var i=0;i<nMaxBac;i++)
		{
			var o=tObj[4][i];
			if (o.x<(x+r)&&(o.x>(x-r))&&(o.y<(y+r))&&(o.y>(y-r))) 
			{cacheCanv(o);}
			var o=tObj[1][i];
			if (o.x<(x+r)&&(o.x>(x-r))&&(o.y<(y+r))&&(o.y>(y-r))) 
			{cacheCanv(o);}
			var o=tObj[11][i];
			if (o.x<(x+r)&&(o.x>(x-r))&&(o.y<(y+r))&&(o.y>(y-r))) 
			{cacheCanv(o);}
			var o=tObj[12][i];
			if (o.x<(x+r)&&(o.x>(x-r))&&(o.y<(y+r))&&(o.y>(y-r))) 
			{cacheCanv(o);}
		}
		return false;
	}
	
}