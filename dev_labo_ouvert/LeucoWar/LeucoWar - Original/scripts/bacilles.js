var nbBacTue=0;
var nbBacPhag=0;
var longBacMort=500;
var longLeucoMort=1000;
var longMacro=5000;
var lastBacMort=0;
var lastLeucoMort=0;
var nMaxBac=300;
var lastPhago=0;
var lastPhago2=0;
var lastBacille=0;
var ageDiv=950;
var ageDivAc=ageDiv*3;

function testBacMort()
{
	return false;
	var nIm=7;
	var o;
	if (tObj[nIm].length>0)
	{
		lastBacMort++;
		if (lastBacMort>=tObj[nIm].length) {lastBacMort=0;}		
		o=tObj[nIm][lastBacMort];
		if (o.age>longBacMort) {cacheCanv(o);}
	}
	
	nIm=10;
	if (tObj[nIm].length>0)
	{
		lastLeucoMort++;
		if (lastLeucoMort>=tObj[nIm].length) {lastLeucoMort=0;}
		o=tObj[nIm][lastLeucoMort];
		if (o.age>longLeucoMort) {cacheCanv(o);}
	}
}

function tueBacille(nCat,i)
{
	var o1=tObj[nCat][i];
	if (!o1.v) {return false;}
	var n;
	
	
	if (etape==2)
	{
		if (pAntibio<=0)
		{
			nbBacTue++;
			var objBac=5;
			progression=Math.round(nbBacTue/objBac*100);
			if (nbBacTue>=objBac)
			{
				tempsAvantEtape=0;
			}
		}
	}


	// bacille => on le tue
	cacheCanv(o1);
	// on crée un déchet
	n=chercheLibre (7);

	if (n>=tObj[7].length) 
	{
		return false;
	}
	
	var o=tObj[7][n];
	
	o.age=0;
	o.x=o1.x;
	o.y=o1.y;	
	o.angle=o1.angle+Math.PI;
	reveleCanv(o);
	return false;
}

function ClicTueBacille ()
{
	var tId=this.id.split(",");
	nSel=tId[1];
	iSel=tId[0];
	tueBacille (iSel,nSel);
}

function testMacrophage(n)
{
	var dx,dy;
	var o1=tObj[0][n];
	if (!o1.v) {return false;}
	
	if (o1.age>longMacro) {tueLeuco(0,n);return false;}
	
	var o2;
	var d;
	// bacilles vivants
	for (var i=0;i<tObj[4].length;i++)
	{
		o2=tObj[4][i];
		if (o2.v)
		{
			//bacille visible
			dx=(o2.x-o1.x);
			dy=(o2.y-o1.y);
			d=(dx*dx+dy*dy);
			if (d<seuilPhago) 
			{
				// macrophage phago
				o1.phago=1;
				if (o1.fleche.v) {nbBacPhag++;}
				// bacille tué
				cacheCanv(o2);
			}
		}
	}	
	// trepo vivants
	for (var i=0;i<tObj[11].length;i++)
	{
		o2=tObj[11][i];
		if (o2.v)
		{
			//visible
			dx=(o2.x-o1.x);
			dy=(o2.y-o1.y);
			d=(dx*dx+dy*dy);
			if (d<seuilPhago) 
			{
				// macrophage phago
				o1.phago=1;
				if (o1.fleche.v) {nbBacPhag++;}
				// tué
				cacheCanv(o2);
			}
		}
	}	
	// bacilles morts
	for (var i=0;i<tObj[7].length;i++)
	{
		o2=tObj[7][i];
		if (o2.v)
		{
			//bacille mort visible
			dx=(o2.x-o1.x);
			dy=(o2.y-o1.y);
			d=(dx*dx+dy*dy);
			if (d<seuilPhago) 
			{
				// macrophage phago
				o1.phago=1;
				if (o1.fleche.v) {nbBacPhag++;}
				// bacille tué
				cacheCanv(o2);
			}
		}
	}
	// bacilles ac
	for (var i=0;i<tObj[1].length;i++)
	{
		o2=tObj[1][i];
		if (o2.v)
		{
			//bacille ac visible
			dx=(o2.x-o1.x);
			dy=(o2.y-o1.y);
			d=(dx*dx+dy*dy);
			if (d<(seuilPhago*2)) // capture facilitée 
			{
				// macrophage phago
				o1.phago=1;
				if (o1.fleche.v) {nbBacPhag++;}
				// bacille tué
				cacheCanv(o2);
			}
		}
	}
	// trepo ac
	for (var i=0;i<tObj[12].length;i++)
	{
		o2=tObj[12][i];
		if (o2.v)
		{
			//bacille ac visible
			dx=(o2.x-o1.x);
			dy=(o2.y-o1.y);
			d=(dx*dx+dy*dy);
			if (d<(seuilPhago*2)) // capture facilitée 
			{
				// macrophage phago
				o1.phago=1;
				if (o1.fleche.v) {nbBacPhag++;}
				// bacille tué
				cacheCanv(o2);
			}
		}
	}
	// leuco morts
	for (var n=0;n<tObj[10].length;n++)
	{
		o2=tObj[10][n];
		if (o2.v)
		{
			dx=(o2.x-o1.x);
			dy=(o2.y-o1.y);
			d=(dx*dx+dy*dy);
			if (d<(seuilPhago*1.5))
			{
				// macrophage phago
				o1.phago=1;
				// leuco mort éliminé
				cacheCanv(o2);
			}
		}
	}
	if (etape==3)
	{
		var objPhag=5;
		progression=Math.round(nbBacPhag/objPhag*100);
		if (nbBacPhag>=objPhag) {tempsAvantEtape=0;}
	}
}

function rafrPhago()
{
	var nIm=0;
	var o;
	
	for (var i=0;i<tObj[nIm].length/4;i++)
	{
		lastPhago2++;
		if (lastPhago2>=tObj[nIm].length)
		{
			lastPhago2=0;
		}
		o=tObj[nIm][lastPhago2];
		if ((o.v)&&(o.phago>0))
		{
			o.phago++;
			if (o.phago>6)
			{
				o.phago=0;
				remplaceImage (nIm,lastPhago2,0);
			}
			else
			{
				remplaceImage (nIm,lastPhago2,o.phago+7);
			}
		}
	}
}

function testBacillesPhago()
{
	if (tObj[0].length==0) {return false;}
	var lTr=10;
	var o;
	for (var i=0;i<lTr;i++)
	{
		lastPhago++;
		if (lastPhago>=tObj[0].length) {lastPhago=0;}
		o=tObj[0][lastPhago];
		if (o.v)
		{
			// macrophage vivant
			testMacrophage(lastPhago);
		}
	}
}


function divisionB (c,i)
{
	var o1=tObj[c][i];
	o1.age=0;
	
	n=chercheLibre (c);
	
	if (n>=tObj[c].length) 
	{
		return false;
	}
	
	var o=tObj[c][n];
	
	o.age=0;
	o.x=o1.x;
	o.y=o1.y;
	o.angle=o1.angle+Math.PI;
	o.dangle=-o1.dangle;
	reveleCanv(o);
}

function metsAc(nCat,n2)
{
	var o1=tObj[nCat][n2];
	var n;
	
	// on crée une bac ac
	var nCat2=1;
	if (nCat==11) {nCat2=12;}
	n=chercheLibre (nCat2);

	if (n>=tObj[nCat2].length) 
	{
		return false;
	}
	
	// bactérie de départ disparait
	cacheCanv(o1);
	
	var o=tObj[nCat2][n];
	
	o.age=o1.age;
	o.x=o1.x;
	o.y=o1.y;
		
	o.angle=o1.angle;
	o.dangle=o1.dangle;
	reveleCanv(o);
	return false;

}

function enleveAc(nCat,n2)
{
	var o1=tObj[nCat][n2];
	var n;
	// bactérie de départ disparait
	cacheCanv(o1);
	// on crée une bac sans ac
	var nCat2=1;
	if (nCat==11) {nCat2=12;}
	n=chercheLibre (nCat2);

	if (n>=tObj[nCat2].length) 
	{
		return false;
	}
	
	var o=tObj[nCat2][n];
	
	o.age=o1.age;
	o.x=o1.x;
	o.y=o1.y;
	
	o.angle=o1.angle;
	o.dangle=o1.dangle;
	reveleCanv(o);
	return false;

}

function testAc(x,y,c)
{
	var test=false;
	var r,d2;
	for (var i=0;i<tObj[9].length;i++)
	{
		var o=tObj[9][i];
		if ((o.degranule>0)&&(o.ac==c))
		{
			r=yMax*(degra-o.degranule)/degra;
			d2=(o.xDeg-x)*(o.xDeg-x)+(o.yDeg-y)*(o.yDeg-y);
			if (d2<(r*r))
			{
				test=true;
				break;
			}
		}
	}
	return test;
}

function croissBacilles()
{
	var lTr=5;
	var nCat=4;
	var o;
	
	for (var i=0;i<lTr;i++)
	{
		lastBacille++;
		if (lastBacille>=tObj[nCat].length) {lastBacille=0;}
		
		// bacilles sans Ac
		nCat=4;
		o=tObj[nCat][lastBacille];
		if (o.v)
		{
			if (testAc(o.x,o.y,4))
			{
				metsAc(nCat,lastBacille);
			}
			else if (o.age>ageDiv)
			{
				// bacille vivant et suffisamment vieux
				divisionB(nCat,lastBacille);
			}
		}
		
		// trepo sans Ac
		nCat=11;
		o=tObj[nCat][lastBacille];
		if (o.v)
		{
			if (testAc(o.x,o.y,11))
			{
				metsAc(nCat,lastBacille);
			}
			else if (o.age>ageDiv)
			{
				// bacille vivant et suffisamment vieux
				divisionB(nCat,lastBacille);
			}
		}
		
		// bacilles avec Ac
		nCat=1;
		o=tObj[nCat][lastBacille];
		if (o.v)
		{
			// mort aléatoire
			if (Math.random()>0.98)
			{
				tueBacille(nCat,lastBacille);
			}
			else if (Math.random()>0.99)
			{
				// débarasse anticorps
				enleveAc(nCat,lastBacille);
			}
			else if (o.age>ageDivAc)
			{
				divisionB(nCat,lastBacille);
			}
		}
		
		// trepo avec Ac
		nCat=12;
		o=tObj[nCat][lastBacille];
		if (o.v)
		{
			// mort aléatoire
			if (Math.random()>0.98)
			{
				tueBacille(nCat,lastBacille);
			}
			else if (Math.random()>0.99)
			{
				// débarasse anticorps
				enleveAc(nCat,lastBacille);
			}
			else if (o.age>ageDivAc)
			{
				divisionB(nCat,lastBacille);
			}
		}
		
	}	
}

function calcInf(x,y,nCat)
{
	// calcul influence bactérienne
	var tot=0.1;
	var inf=0;
	var d=0;
	var lTerr2=xMax*xMax;
	var o2;
	
	if (cObj[nCat].n>0)
	{
		for (var i=0;i<tObj[nCat].length;i++)
		{
			o2=tObj[nCat][i];
			if (o2.v)
			{
				d=((x-o2.x)*(x-o2.x)+(y-o2.y)*(y-o2.y))/lTerr2+0.0004;
				if (d<0.02)
				{
					d=d*d;
					inf=1/d;
					tot+=inf;
				}
			}
		}
	}
	return tot/nMaxBac;;
} // endf calcInf

function septicemie()
{
	// inutilisée pour l'instant
	tObj[4][lastBacille].sang=true;
	tObj[1][lastBacille].sang=true;
	tObj[11][lastBacille].sang=true;
	tObj[12][lastBacille].sang=true;
	septi++;
}