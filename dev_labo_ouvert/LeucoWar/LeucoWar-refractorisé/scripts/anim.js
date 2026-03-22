var septi=0;
var tpsM=0;
var ntpsM=0;
var tempsAvantEtape=9999999;
var pause=true;
var temps=0;
function bougeObj(i,n,x,y)
{
	var irel=Math.round(x/xMax*100);
	var o=tObj[i][n];
	
	if ((o.sang)&&(y>yVaiss[irel]))
	{
		if (x<0) // le sang repart de l'autre côté
		{x+=xMax;o.fleche.v=false;iSel=(i==iSel)&&(n==nSel)?-1:iSel;}
		else if (x>xMax)
		{x-=xMax;o.fleche.v=false;iSel=(i==iSel)&&(n==nSel)?-1:iSel;}
	}
	else
	{
		// rebond à gauche et à droite
		if (x<0)
		{x+=vit;o.angle-=PI;o.fleche.v=false;}
		if (x>xMax)
		{x-=vit;o.angle-=PI;o.fleche.v=false;}
	}
	
	if (y<0)
	{y+=vit;o.angle-=PI;o.fleche.v=false;}
	
	if (y>(yMax-margeVaiss))
	{y-=vit;o.angle+=PI;o.fleche.v=false;}
	
	if (!o.sang)
	{
		if (y>(yVaiss[irel]-margeVaiss))
		{y=yVaiss[irel]-margeVaiss-vit;o.angle+=PI;o.fleche.v=false;}
	}
	
	if (!o.tissus)
	{
		if (y<(yVaiss[irel]+margeVaiss))
		{
			if (o.diap)
			{
				if (y<yVaiss[irel])
				{
					diapedese(i,n);
					return false;
				}
			}
			else
			{
				y=yVaiss[irel]+margeVaiss+vit/4;o.angle-=PI;o.fleche.v=false;
			}
		}
	}
	
	o.x=x;
	o.y=y;
}


function cacheCanv(ob)
{
	ob.v=false;
	ob.canv.style.display="none";
}

function reveleCanv(ob)
{
	ob.v=true;
	rafrCanv(ob);
	ob.canv.style.display="block";
}

function rafrCanv (ob)
{
	if (vPre=="Webkit") {ob.canv.style.webkitTransform="rotate("+Math.round(ob.angle*57.3)+"deg)";}
	else if (vPre=="Moz") {ob.canv.style.MozTransform ="rotate("+Math.round(ob.angle*57.3)+"deg)";}
	else if (vPre=="O") {ob.canv.style.OTransform ="rotate("+Math.round(ob.angle*57.3)+"deg)";}
	else if (vPre=="ms") {ob.canv.style.msTransform ="rotate("+Math.round(ob.angle*57.3)+"deg)";}

	ob.canv.style.left = Math.round((-xDec+ob.x-ob.l/2)*zF)+"px";
	ob.canv.style.top = Math.round((-yDec+ob.y-ob.h/2)*zF)+"px";
}


function anim()
{
	var dte = new Date();
	var tps = dte.getTime();
	temps++;
	
	//message (cSel,0);
	testBougeBord ();
	if (temps%3==0) {dilueGrad();}
	if ((temps+1)%3==0) {calcYVaisseau();}
	if ((temps+2)%3==0) {testMono();testPlasmoSang();}
	var comptage=0;
	var o=new Object();
	var angle;
	var dx,dy,x,y,x0,x1,y0,y1,irel,da;
	var seuil=vit*5;
	var vSang=(1+Math.sin(temps/4))*2;
	
	testBacillesPhago();
	croissBacilles();
	testMasto();
	testPlasmo();
	testBacMort();
	
	for (var i=0;i<nTObj;i++)
	{
		if (i!=5)// pas les vaisseaux
		{
			comptage=0;
			for (var n=0;n<tObj[i].length;n++)
			{
				o=tObj[i][n];
				x0=o.x;
				y0=o.y;
				if (o.v)
				{	
					comptage++;
					o.age++;
					f=o.fleche;
					irel=Math.round(o.x/xMax)*100;
										
					if (f.v)
					{
						// déplacement sur flèche
						x1=f.x;
						y1=f.y;
						dx=x1-x0;
						dy=y1-y0;
						if ((dx*dx+dy*dy)<seuil) {
							bougeObj(i,n,x1,y1);
							o.fleche.v=false;
						}
						else
						{
							angle = Math.atan2(dy, dx);
							o.angle=angle;
							o.dangle=0;
							x=x0+Math.cos(angle)*vit*3*o.c; // fleche => vit*3
							y=y0+Math.sin(angle)*vit*3*o.c;
							bougeObj(i,n,x,y);
						}

					}
					else
					{
						// pas flèche
						if (((i!=iSel)||(n!=nSel))
						&&(o.bouge))
						{
							//bouge aléatoirement
							if (o.diap) // diapédèse
							{
								if ( ((etape==5)&&(i==2)) || ((etape==6)&&(i==8))  || ((etape==10)&&(i==8)) )
								{
									if ((o.x>xDec)&&(o.x<(xDec+lCanv)))
									{
										progression+=1;										
									}
									else
									{
										progression+=0.5;
									}
									if (progression>=100) {tempsAvantEtape=0;}
								}
								
								o.angle=(o.angle+PI/2)/2;
								x=x0;
								y=y0-vit*o.c;
							}
							else if (i!=6)
							{
								// pas hématie pas diapédèse
								o.angle+=o.dangle*0.05*o.c;

								o.angle=o.angle%(2*PI);
								o.dangle+=(Math.random()-0.5);	
								if (o.dangle>1) {o.dangle=1;}
								if (o.dangle<-1) {o.dangle=-1;}

								dx=Math.cos(o.angle)*vit*o.c;
								dy=Math.sin(o.angle)*vit*o.c;
								
								if ((i==0)||(i==9))
								{
									// influence masto sur macro et plasmo
									calcBaryMast (x0,y0);
									if (pBaryMast>0)
									{
										//dx=(dx+Math.cos(angleBaryMast)*pBaryMast)/(1+pBaryMast);
										//dy=(dy+Math.sin(angleBaryMast)*pBaryMast)/(1+pBaryMast);
										
										da=dAngle(o.angle,angleBaryMast);
										if (da<PI) {
											// moins de PI d'écart => sens trigo
											o.dangle+=da/25*pBaryMast;
										}
										else
										{
											o.dangle-=(2*PI-da)/25*pBaryMast;
										}										
										//if (n==0) {console.log (pBaryMast);}
									}
								}
								
								dx=dx*vit*o.c;
								dy=dy*vit*o.c;
								x=x0+dx;
								y=y0+dy;
								if ((y>yVaiss[irel])&&(o.sang))
								{
									// on est dans un vaisseau sanguin => droite
									x=x0+vSang*vit;
								}
							}
							else if (i==6)
							{
								//hématie
								o.angle+=o.dangle*0.05*o.c;
								o.angle=o.angle%(2*PI);
								x=x0+vit*(Math.abs(o.dangle)+0.5)+vSang*vit;		
								y=y0;
							}
							bougeObj (i,n,x,y);
						}
					}
					
					if ((temps%frameSkip)==0) {
						rafrCanv (o);
					}
						
					if ((bougeFond)&&(temps%frameSkip==0)) {bougeFond=false; fond();}
					
				} // o.v
			} // for n
			cObj[i].n=comptage;
		} // i!=5 pas vaisseaux
	} // for i
	
	if ((temps%frameSkip)==0) {
		ctxM.clearRect (0,0,lCanv,hCanv);
		fond();
		rafrBarreDouleur();
	}

	    // On parcourt notre nouveau tableau d'objets créés par POO.
    // "gameObjects" est encore une variable globale, donc accessible ici.
    for (const objet of gameObjects) {
        // Pour chaque objet, on appelle ses propres méthodes de mise à jour et de dessin
        if (objet.visible) {
            objet.update(); // Met à jour l'âge, la position, etc.
            objet.draw(zF, xDec, yDec);   // Redessine l'objet à sa nouvelle position
        }
    }
	
	rafrPhago();
	rafrMasto();
	rafrPlasmo();
	rafrAntibio();
	rafrVaisseau();
	rafrFleches();
	

	
	douleur=douleur*0.996-0.04;
	if (douleur<0) {douleur=0;}
	else if (douleur>100) {douleur=100;}
	
	if (etape==7) {progression=(3000-tempsAvantEtape)/3000*100;}
	if (etape==8) {progression=(1500-tempsAvantEtape)/1500*100;}
	if (etape==9) {progression=(1500-tempsAvantEtape)/1500*100;}
	
	tempsAvantEtape--;
	if (tempsAvantEtape<=0) {afficheEtape();}
	
	var dte2 = new Date();
	var tps2 = dte2.getTime();
	var dtps=tps2-tps;
	
	tpsM+=dtps;
	ntpsM++;
	
	if (ntpsM>=10)
	{
		tpsM=Math.round(tpsM/10);
		ntpsM=0;
		//message (tpsM+" ms "+"fs="+(frameSkip-1),0);
		if (tpsM>30) {frameSkip++;aura=false;if (frameSkip>fsMax) {frameSkip=fsMax;} }
		else
		if ((tpsM<20)&&(frameSkip>fsMin)) {frameSkip--;if (frameSkip<fsMin) {frameSkip=fsMin;} }
		tpsM=0;
	}
	
}

function stopAnim()
{
	if (pause) {return false;}
	pause=true;
	clearInterval(timerAnim);
}

function startAnim()
{
	if (fini) {return false;}
	if (!pause) {return false;}
	pause=false;
	timerAnim=setInterval(function(){anim()},Math.round(1000/fps));
}