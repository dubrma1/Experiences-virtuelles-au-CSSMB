function afficheInfo (c,n,x,y)
{
	canvI.style.display="block";
	ctxI.fillStyle="rgba(255,255,255,0.3)";
	ctxI.clearRect (0,0,canvI.width,canvI.height);
	
	var ht=Math.round(canvI.height*0.7);
	var texte;
	switch(c) {
	case "-2":
        texte="antibiotique";
        break;
    case "0":
        texte="macrophage";
		if (modeCollege) {texte="phagocyte";}
        break;
    case "1":
        texte="bacille";
		if (modeCollege) {texte="bactérie (espèce n°1)";}
        break;
	case "2":
        texte="monocyte";
		if (modeCollege) {texte="phagocyte";}
		break;
	case "3":
        texte="mastocyte";
		if (modeCollege) {texte="cellule sentinelle";}
        break;
	case "4":
        texte="bacille";
		if (modeCollege) {texte="bactérie (espèce n°1)";}
        break;
	case "8":
        texte="plasmocyte";
		if (modeCollege) {texte="lymphocyte B";}
        break;
	case "9":
        texte="plasmocyte";
		if (modeCollege) {texte="lymphocyte B";}
        break;
	case "11":
        texte="tréponème";
		if (modeCollege) {texte="bactérie (espèce n°2)";}
        break;
	case "12":
        texte="tréponème";
		if (modeCollege) {texte="bactérie (espèce n°2)";}
        break;
    default:
        texte="inconnu ?";
	} 
	ctxI.font="italic "+ht+"px "+mFont;
	var l=Math.round(ctxI.measureText(texte+"__").width);
	canvI.style.left=Math.round(x-l/2)+"px";
	canvI.style.top=Math.round(y+26)+"px";
	
	ctxI.fillRect (0,0,l,canvI.height);
	ctxI.fillStyle="rgba(0,0,0,0.3)";
	ctxI.fillRect (0,0,l,1);
	ctxI.fillRect (0,canvI.height-1,l,1);
	ctxI.fillRect (0,0,1,canvI.height);
	ctxI.fillRect (l-1,0,1,canvI.height);
	
	ctxI.fillStyle="rgba(0,0,0,0.6)";
	ctxI.textAlign="center";
	ctxI.fillText (texte,l/2,canvI.height/2+ht*0.3);	
}

function cacheInfo()
{
	canvI.style.display="none";
}