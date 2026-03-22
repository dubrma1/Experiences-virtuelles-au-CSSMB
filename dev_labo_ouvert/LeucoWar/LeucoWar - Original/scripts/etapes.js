var etapeAffiche=false;
var objectif="";
var etape=0;

function fondFin (nIm,a)
{
	ctxT.globalAlpha=a;
	ctxT.fillStyle = ctx.createPattern(tImg[nIm], "repeat");
	ctxT.fillRect(2,2,canvT.width-4,canvT.height-4);
	ctxT.globalAlpha=1;
	var grd=ctxT.createRadialGradient(0,0,canvT.width*0.4,0,0,canvT.width*0.6);
	grd.addColorStop(0,"rgba(255,255,255,0.9)");
	grd.addColorStop(1,"rgba(255,255,255,0.25)");
	ctxT.save();
	ctxT.translate(canvT.width/2,canvT.height/2);
	ctxT.fillStyle=grd;
	ctxT.fillRect(-canvT.width/2+2,-canvT.height/2+2,canvT.width-4,canvT.height-4);
	ctxT.restore();
}

function finPartie(cas)
{
	stopAnim();
	var tpsPartie=Math.round(temps/fps);
	fini=true;
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
	
	function affBouton ()
	{
		var nIm=29;
		var lBouton=l/4;
		var hBouton=tImg[nIm].height/tImg[nIm].width*lBouton;
		var xBouton=(l-lBouton)/2+marge;
		var yBouton=h-hBouton+marge;
		ctxT.save();
		ctxT.drawImage(tImg[nIm],0,0,tImg[nIm].width,tImg[nIm].height,xBouton,yBouton,lBouton,hBouton);
		ctxT.font="bold "+ht+"px "+mFont;
		ctxT.textAlign="center";
		ctxT.fillStyle="white";
		ctxT.fillText("Recommencer",canvT.width/2,yBouton+hBouton/2+ht*0.3);
		ctxT.restore();
	}
	
	
	if (cas==0)
	{
		// on efface toutes les bactéries
		for (var i=0;i<(nMaxBac);i++)
		{
			cacheCanv(tObj[1][i]);
			cacheCanv(tObj[4][i]);
			cacheCanv(tObj[11][i]);
			cacheCanv(tObj[12][i]);
		}
		// arc en ciel
		ctxT.globalAlpha=0.5;
		ctxT.drawImage(tImg[34],0,0,tImg[34].width,tImg[34].height,2,2,canvT.width-4,canvT.height-4);
		ctxT.globalAlpha=1;
		//texte
		ctxT.fillStyle="black";
		var ht=Math.round(h/20);
		ctxT.font="bold italic "+ht+"px "+mFont;
		var y=marge+ht*0.7;
		
		y=wrapText(ctxT,"Victoire !", x, y, l, ht*1.5) ;
		y+=ht*2;
		
		ht=Math.round(h/30);
		ctxT.font=ht+"px "+mFont;
		y=wrapText(ctxT,"Vous avez réussi à juguler l'infection en "+tpsPartie+" secondes de jeu. Félicitations !", x, y, l, ht*1.5) ;
		y+=ht*3;
				
	}
	else if (cas==1)
	{
		// texture mort
		fondFin (33,0.3);
		//texte
		ctxT.fillStyle="black";
		var ht=Math.round(h/20);
		ctxT.font="bold italic "+ht+"px "+mFont;
		var y=marge+ht*0.7;
		
		y=wrapText(ctxT,"Vous avez échoué !", x, y, l, ht*1.5) ;
		y+=ht*2;
		
		ht=Math.round(h/30);
		ctxT.font=ht+"px "+mFont;
		y=wrapText(ctxT,"Au bout de "+tpsPartie+" secondes de jeu, l'infection s'est étendue au point que le pronostic vital du patient est à présent engagé ...", x, y, l, ht*1.5) ;
		y+=ht*2;	
		
		var texte;
		if (modeCollege) {
			if (etape<3) {texte="Pour découvrir les épisodes suivants, il faut d'abord que vous cliquiez sur quelques bactéries pour les tuer. Et si vous recommenciez ?";}
			else if (etape<4) {texte="Etes vous sûr d'avoir compris comment utiliser les phagocytes? Et si vous réessayiez ?";}
			else if (etape<5) {texte="Pour découvrir les épisodes suivants, et comprendre tout l'intérêt des cellules sentinelles, vous devez leur faire libérer les molécules inflammatoires qu'ils contiennent. Pour cela, double-cliquez sur quelques uns d'entre eux. Et si vous recommenciez ?";}
			else if (etape<6) {texte="Apparemment vous n'avez pas réussi à recruter suffisamment de nouveaux phagocytes. Lors de votre prochaine partie, double-cliquez sur les cellules sentinelles lorsqu'ils sont près des vaisseaux afin de leur faire libérer leurs molécules inflammatoires, et essayez de faire traverser les phagocytes.";}
			else if (etape<7) {texte="Les lymphocytes B vous auraient été d'un grand secours car ils peuvent neutraliser rapidement un grand nombre de bactéries en produisant des anticorps. Lors de votre prochain essai, utilisez les cellules sentinelles pour faciliter leur recrutement.";}
			else if (etape<8) {texte="Si vous aviez pu continuer, vous auriez eu à affronter un nouveau type de bactéries ... et si vous recommenciez ?";}
			else {texte="Vous étiez si près de la victoire, cette deuxième infection est la dernière avant la guérison totale de votre patient. Une nouvelle tentative ?";}
		} else {
			if (etape<3) {texte="Pour découvrir les épisodes suivants, il faut d'abord que vous cliquiez sur quelques bactéries pour les tuer. Et si vous recommenciez ?";}
			else if (etape<4) {texte="Etes vous sûr d'avoir compris comment utiliser les macrophages? Et si vous réessayiez ?";}
			else if (etape<5) {texte="Pour découvrir les épisodes suivants, et enfin comprendre tout l'intérêt des mastocytes, vous devez leur faire libérer les médiateurs qu'ils contiennent. Pour cela, double-cliquez sur quelques uns d'entre eux. Et si vous recommenciez ?";}
			else if (etape<6) {texte="Apparemment vous n'avez pas réussi à recruter suffisamment de nouveaux macrophages. Lors de votre prochaine partie, double-cliquez sur les mastocytes lorsqu'ils sont près des vaisseaux afin de leur faire libérer leurs médiateurs, et essayez de faire traverser les monocytes pour qu'ils se différencient en macrophages.";}
			else if (etape<7) {texte="Les plasmocytes vous auraient été d'un grand secours car ils peuvent neutraliser rapidement un grand nombre de bactéries grâce aux anticorps qu'ils sécrètent. Lors de votre prochain essai, utilisez les mastocytes pour faciliter leur recrutement.";}
			else if (etape<8) {texte="Si vous aviez pu continuer, vous auriez eu à affronter un nouveau type de bactéries ... et si vous recommenciez ?";}
			else {texte="Vous étiez si près de la victoire, cette infection de tréponèmes est la dernière avant la guérison totale de votre patient. Une nouvelle tentative ?";}
		}
		ht=Math.round(h/30);
		ctxT.font=ht+"px "+mFont;
		y=wrapText(ctxT,texte, x, y, l, ht*1.5) ;
		y+=ht*3;
	}
	else if (cas==2)
	{
		// texture mort
		fondFin (33,0.3);
		//texte
		ctxT.fillStyle="black";
		var ht=Math.round(h/20);
		ctxT.font="bold italic "+ht+"px "+mFont;
		var y=marge+ht*0.7;
		
		y=wrapText(ctxT,"Vous avez échoué !", x, y, l, ht*1.5) ;
		y+=ht*2;
		
		ht=Math.round(h/20);
		ctxT.font=ht+"px "+mFont;
		y=wrapText(ctxT,"Au bout de "+tpsPartie+" secondes de jeu, la douleur a atteint un niveau intolérable pour le patient. Ce dernier a préféré renoncer à votre aide plutôt que d'endurer davantage de tourments.", x, y, l, ht*1.5) ;
		y+=ht*2;	
		
		ht=Math.round(h/30);
		ctxT.font=ht+"px "+mFont;
		
		if (modeCollege) {
			y=wrapText(ctxT,"La sensation douloureuse est en grande partie liée aux molécules inflammatoires libérées par les cellules sentinelles. La prochaine fois, essayez d'espacer dans le temps la libération de ces molécules.", x, y, l, ht*1.5) ;	
		} else {
			y=wrapText(ctxT,"La sensation douloureuse est en grande partie liée aux médiateurs chimiques de l'inflammation. La prochaine fois, essayez d'espacer dans le temps la libération de ces médiateurs.", x, y, l, ht*1.5) ;	
		}
		y+=ht*3;	
	}
	
	affBouton ();
	canvT.style.display="block";
}

function afficheEtape()
{
	stopAnim();
	var marge=canvT.height/20;
	var h=canvT.height-2*marge;
	var l=canvT.width-2*marge;
	var x=marge;
	var etapeA;
	
	if (simpleRappelConsignes) {etapeA=etape-1;}
	else {etapeA=etape;}
	
	// cadre
	ctxT.fillStyle="rgb(240,240,240)";
	ctxT.fillStyle="white";
	ctxT.fillRect(0,0,canvT.width,canvT.height);
	ctxT.fillStyle="rgb(100,100,100)";
	ctxT.fillRect(0,0,2,canvT.height);
	ctxT.fillRect(canvT.width-2,0,2,canvT.height);
	ctxT.fillRect(0,0,canvT.width,2);
	ctxT.fillRect(0,canvT.height-2,canvT.width,2);
	
	function affIm (nIm)
	{
		ctxT.drawImage(tImg[nIm],0,0,tImg[nIm].width,tImg[nIm].height,3*l/4,marge,(l/4),tImg[nIm].height/tImg[nIm].width*(l/4));
		ctxT.strokeStyle="black";
		ctxT.strokeRect(3*l/4,marge,(l/4),tImg[nIm].height/tImg[nIm].width*(l/4));
	}
	
	function affBouton ()
	{
		var nIm=29;
		var lBouton=l/4;
		var hBouton=tImg[nIm].height/tImg[nIm].width*lBouton;
		var ht=Math.round(hBouton/2);
		var xBouton=(l-lBouton)/2+marge;
		var yBouton=h-hBouton+marge;
		ctxT.save();
		ctxT.drawImage(tImg[nIm],0,0,tImg[nIm].width,tImg[nIm].height,xBouton,yBouton,lBouton,hBouton);
		ctxT.font="bold "+ht+"px "+mFont;
		ctxT.textAlign="center";
		ctxT.fillStyle="white";
		ctxT.fillText("Continuer",canvT.width/2,yBouton+hBouton/2+ht*0.3);
		ctxT.restore();
	}
	
	function affSwitchCollege () {
		var nIm=37;
		var lBouton=l/20;
		var hBouton=tImg[nIm].height/tImg[nIm].width*lBouton;
		var ht=Math.round(hBouton*0.6);
		var xBouton=l-lBouton*2;
		var yBouton=marge;
		var nSw=0;
		if (modeCollege==false) {nSw=1;}
		ctxT.save();
		ctxT.font="bold "+ht+"px "+mFont;
		ctxT.fillStyle="black";
		ctxT.textAlign="left";
		ctxT.fillText("lycée",xBouton+lBouton+ht*0.5,yBouton+hBouton/2+ht*0.4);
		ctxT.textAlign="right";
		ctxT.fillText("collège",xBouton-ht*0.5,yBouton+hBouton/2+ht*0.4);
		ctxT.drawImage(tImg[nIm+nSw],0,0,tImg[nIm+nSw].width,tImg[nIm+nSw].height,xBouton,yBouton,lBouton,hBouton);
		ctxT.restore();		
	}
	
	fondFin(35,0.4);	
	if (etapeA==0)
	{
		//texte
		ctxT.fillStyle="black";
		var ht=Math.round(h/20);
		ctxT.font="bold italic "+ht+"px "+mFont;
		var y=marge+ht*0.7;
		
		var texte="Bienvenue dans Leuco War";
		if (modeCollege) {texte="Bienvenue dans Leuco War (mode collège)";}
		y=wrapText(ctxT,texte, x, y, l, ht*1.5) ;
		
		y+=ht*2;
		
		if (modeCollege) {
			y+=ht*2;
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Dans ce jeu votre but est de sauver une personne atteinte d'une infection bactérienne. ", x, y, l, ht*1.5) ;
			y+=ht*4;
			
			
				ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Vous devrez assister son système immunitaire afin qu'elle guérisse le plus rapidement possible.", x, y, l, ht*1.5) ;
			y+=ht*4;
			
			
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Au cours de votre partie, vous découvrirez les différents LEUCOCYTES (globules blancs) impliqués dans la défense de l'organisme.", x, y, l, ht*1.5) ;
			y+=ht*4;
		} else {
					
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Dans un futur lointain, l'essor des nanotechnologies permettra à l'Homme de contrôler chaque cellule individuellement.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Pour autant, les maladies infectieuses n'auront pas disparu, et la guerre contre les maladies sera loin d'être gagnée.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Vous êtes ce qu'on appelle un nanomédecin. "+
			"Votre tâche est d'assister le système immunitaire de votre patient afin qu'il guérisse le plus rapidement possible. Au cours de votre partie, vous en prendrez progressivement le contrôle, découvrant les différents globules blancs (leucocytes) impliqués dans la défense de l'organisme.", x, y, l, ht*1.5) ;
			y+=ht*4;
			
			ht=Math.round(h/40);
			ctxT.font="italic "+ht+"px "+mFont;
			y=wrapText(ctxT,"NB : il s'agit d'un scenario fictif et totalement fantaisiste.", x, y, l, ht*1.5) ;
		}
	}
	
	if (etapeA==1)
	{
		// image tue bactéries
		affIm (25)
	
		//texte
		ctxT.fillStyle="black";
		var ht=Math.round(h/20);
		ctxT.font="bold italic "+ht+"px "+mFont;
		var y=marge+ht*0.7;
		
		y=wrapText(ctxT,"Eliminez les bactéries !", x, y, l*0.7, ht*1.5) ;
		y+=ht*2;
		
		if (modeCollege) {
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Vous êtes face à une zone infectée par des bactéries. Un vaisseau sanguin se trouve à proximité.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Pour commencer, tuez quelques bactéries en cliquant directement sur chacune d'entre elles.", x, y, l*0.7, ht*1.5) ;
			y+=ht*3;



			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			if (is_touch_device) {
				y=wrapText(ctxT,"ATTENTION : votre terrain de chasse est plus vaste que votre écran. "+
				"Pour explorer l'ensemble de ce terrain il vous suffit de toucher l'écran et de le déplacer en bougeant votre doigt (ou stylet).", x, y, l*0.7, ht*1.5) ;		
			}
			else
			{
				y=wrapText(ctxT,"Votre terrain de chasse est plus vaste que votre écran. "+
				"Pour explorer l'ensemble de ce terrain il vous suffit de rapprocher le curseur de votre souris des bords de votre écran.", x, y, l*0.7, ht*1.5) ;		
				y+=ht*2;
				y=wrapText(ctxT,"Vous pouvez aussi vous déplacer en bougeant la souris en maintenant le bouton enfoncé.", x, y, l, ht*1.5) ;		
			}
			y+=ht*2;
			
			
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"NB : vous pourrez à tout moment réafficher ces consignes en cliquant sur la barre de progression de l'objectif", x, y, l, ht*1.5) ;
			y+=ht*4;
			
		} else {
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Les tissus de votre patient sont infectés par des bactéries.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Pour commencer, vous pourriez essayer de tuer quelques bactéries en cliquant directement sur chacune d'entre elles.", x, y, l*0.7, ht*1.5) ;
			y+=ht*3;

			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"(vous pourrez à tout moment réafficher ces consignes en cliquant sur la barre de progression de l'objectif)", x, y, l*0.7, ht*1.5) ;
			y+=ht*3;
			
			
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			if (is_touch_device) {
				y=wrapText(ctxT,"Votre terrain de chasse est plus vaste que votre écran. "+
				"Pour explorer l'ensemble de ce terrain il vous suffit de toucher l'écran et de le déplacer en bougeant votre doigt (ou stylet).", x, y, l*0.7, ht*1.5) ;		
			}
			else
			{
				y=wrapText(ctxT,"Votre terrain de chasse est plus vaste que votre écran. "+
				"Pour explorer l'ensemble de ce terrain il vous suffit de rapprocher le curseur de votre souris des bords de votre écran.", x, y, l*0.7, ht*1.5) ;		
				y+=ht*2;
				y=wrapText(ctxT,"Vous pouvez aussi vous déplacer en bougeant la souris en maintenant le bouton enfoncé.", x, y, l, ht*1.5) ;		
			}
			y+=ht*2;
		}
		
		objectif="tuer quelques bactéries";
	}
	
	if (etapeA==2)
	{
		// image macrophage
		affIm (26);
		
		//texte
		ctxT.fillStyle="black";
		var ht=Math.round(h/20);
		ctxT.font="bold italic "+ht+"px "+mFont;
		var y=marge+ht*0.7;
		
		if (modeCollege) {
			y=wrapText(ctxT,"Contrôlez les phagocytes !", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Il y a beaucoup trop de bactéries, et elles se multiplient trop vite pour que vous puissiez toutes les éliminer une par une.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Les phagocytes sont les premiers défenseurs de notre corps. En quelques heures, ils sont très nombreux sur le lieu de l'infection. Ils éliminent les bactéries en les absorbant et en les digérant.", x, y, l*0.7, ht*1.5) ;
			y+=ht*3;
			
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"C'est un mécanisme de défense non spécifique (c'est à dire que c'est la même réaction quel que soit le microbe attaquant). On appelle ce phénomène la PHAGOCYTOSE.", x, y, l*0.7, ht*1.5) ;
			y+=ht*3;
			
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Pour donner un ordre de déplacement à un phagocyte, cliquez sur ce dernier et, tout en maintenant le bouton de la souris enfoncé, "+
			"indiquez l'endroit où il doit se rendre. Il est possible d'assigner des ordres à plusieurs phagocytes sans attendre la fin du déplacement de chacun.", x, y, l, ht*1.5) ;
			y+=ht*2;						

		} else {
			y=wrapText(ctxT,"Contrôlez les macrophages !", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Il y a beaucoup trop de bactéries, et celles-ci se multiplient trop vite, pour que vous puissiez toutes les éliminer une par une.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Les macrophages peuvent vous aider à éliminer les bactéries en les phagocytant.", x, y, l*0.7, ht*1.5) ;
			y+=ht*3;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Pour donner un ordre de déplacement à un macrophage, cliquez sur ce dernier et, tout en maintenant le bouton de la souris enfoncé, "+
			"indiquez l'endroit où il doit se rendre. Il est possible d'assigner des ordres à plusieurs macrophages sans attendre la fin du déplacement de chacun.", x, y, l, ht*1.5) ;
			y+=ht*2;
		}
		
		objectif="phagocyter quelques bactéries";
	}
	
	if (etapeA==3)
	{
		// image mastocyte
		affIm (27);
	
		//texte
		ctxT.fillStyle="black";
		var ht=Math.round(h/20);
		ctxT.font="bold italic "+ht+"px "+mFont;
		var y=marge+ht*0.7;
		
		if (modeCollege) {
			y=wrapText(ctxT,"Les cellules sentinelles", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Comme leur nom l'indique, les cellules sentinelles jouent le rôle de vigie de notre système immunitaire. Elles sont capables d'attirer sur les lieux de l'infection d'autres leucocytes.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Cette attraction se fait grâce à des molécules fabriquées par les cellules sentinelles et appelées molécules inflammatoires.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Les cellules sentinelles libèrent ces molécules automatiquement si elles sont entourées de bactéries, mais vous pouvez forcer cette libération en double cliquant sur elles.", x, y, l*0.7, ht*1.5) ;
			y+=ht*3;
			
			
			objectif="libérer des molécules inflammatoires";
		} else {
						
			y=wrapText(ctxT,"Les mastocytes", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Les mastocytes sont capables d'attirer sur les lieux de l'infection d'autres leucocytes.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Cette attraction (chimiotactisme) se fait par l'intermédiaire de molécules appelées médiateurs chimiques de l'inflammation.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Les mastocytes libèreront ces médiateurs automatiquement s'ils sont entourés de bactéries, "+
			"mais vous pouvez forcer cette libération en double cliquant sur eux.", x, y, l*0.7, ht*1.5) ;
			y+=ht*3;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Déplacez les mastocytes dans des zones contenant beaucoup de bactéries, "+
			"et faîtes les sécréter leurs médiateurs chimiques (remarque : dans la réalité, les mastocytes ne se déplacent pas).", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			objectif="libérer des médiateurs de l'inflammation";
		}
	}
	
	if (etapeA==4)
	{
		// image inflammation
		affIm (24);
	
		//texte
		ctxT.fillStyle="black";
		var ht=Math.round(h/20);
		ctxT.font="bold italic "+ht+"px "+mFont;
		var y=marge+ht*0.7;
		
		if (modeCollege) {
			y=wrapText(ctxT,"L'inflammation", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Les molécules inflammatoires ne se contentent pas d'attirer les autres leucocytes.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Elles entraînent aussi une augmentation de la sensation douloureuse.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"De plus, le vaisseau sanguin s'est dilaté permettant le passage de leucocytes du sang vers le lieu de l'infection.", x, y, l, ht*1.5) ;
			y+=ht*3;
			
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Vous pouvez accélérer le recrutement des phagocytes en les sélectionnant dans le vaisseau sanguin et en les amenant vers la zone infectée.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			objectif="attirer quelques phagocytes";
		} else {
		
			y=wrapText(ctxT,"L'inflammation", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Vous l'avez remarqué ? Les médiateurs chimiques de l'inflammation ne se contentent pas d'attirer les autres leucocytes.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Leur libération s'est accompagnée d'une augmentation de la sensation douloureuse.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"De plus, le vaisseau sanguin s'est dilaté et les cellules qui le composent se sont écartées, "+
			"permettant le passage de leucocytes du sang vers les tissus (diapédèse).", x, y, l, ht*1.5) ;
			y+=ht*3;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Utilisez cette propriété pour recruter davantage de macrophages (ces derniers provenant de la différenciation de monocytes sanguins).", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			objectif="recruter quelques macrophages";
		}
	}
	
	if (etapeA==5)
	{
		// image plasmocyte
		affIm (28);
	
		//texte
		ctxT.fillStyle="black";
		var ht=Math.round(h/20);
		ctxT.font="bold italic "+ht+"px "+mFont;
		var y=marge+ht*0.7;
		
		if (modeCollege) {
			y=wrapText(ctxT,"Les lymphocytes B et la réponse immunitaire spécifique", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Il s'est passé plusieurs jours depuis le début de l'infection. Seuls, les phagocytes n'arrivent pas à éliminer toutes les bactéries.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Mais l'organisme a eu le temps de développer une réponse immunitaire spécifiquement dirigée contre cette bactérie.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"En effet, certains lymphocytes B (un autre type de leucocyte) sont capables de produire des molécules très efficaces contre le microbe attaquant."+
			"Ces molécules sont appelées anticorps.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Les lymphocytes B spécifiques de cette bactérie se sont multipliés en grand nombre et arrivent par la circulation sanguine.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Utilisez les cellules sentinelles pour attirer des lymphocytes B sur le lieu de l'infection.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font="italic "+ht+"px "+mFont;
			y=wrapText(ctxT,"Remarque : dans la réalité les lymphocytes B circulent dans la lymphe et non dans le sang, et demeurent dans les ganglions. Seuls les anticorps circulent dans le sang jusqu'aux tissus.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			objectif="attirer quelques lymphocytes B";
		} else {
			y=wrapText(ctxT,"La réponse adaptative", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Il s'est passé plusieurs jours depuis le début de l'infection.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"L'organisme a pu depuis développer une réponse immunitaire spécifiquement dirigée contre ce bacille.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Cette réponse spécifique se fait par l'intermédiaire de molécules appelées anticorps. "+
			"Ces derniers sont libérés par des leucocytes appelés plasmocytes.", x, y, l*0.7, ht*1.5) ;
			y+=ht*3;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Utilisez les mastocytes pour recruter un plasmocyte.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/40);
			ctxT.font="italic "+ht+"px "+mFont;
			y=wrapText(ctxT,"NB : dans la réalité les plasmocytes circulent dans la lymphe et non dans le sang, et résident dans les organes lymphoïdes. Les vaisseaux lymphatiques n'ont pas été représentés ici afin de ne pas surcharger l'interface.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			objectif="recruter quelques plasmocytes";
		}

	}
	
	if (etapeA==6)
	{
		// image plasmocyte
		affIm (28);
		//texte
		ctxT.fillStyle="black";
		var ht=Math.round(h/20);
		ctxT.font="bold italic "+ht+"px "+mFont;
		var y=marge+ht*0.7;
		
		
	
		if (modeCollege) {
			
			y=wrapText(ctxT,"Les anticorps", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Les lymphocytes B libèrent spontanément leurs anticorps lorsqu'ils sont en présence des bactéries responsables de l'infection.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Les anticorps se fixent spécifiquement sur ces bactéries, les neutralisant.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Les phagocytes peuvent alors plus facilement les éliminer.", x, y, l, ht*1.5) ;
			y+=ht*3;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Utilisez les lymphocytes B pour neutraliser les bactéries, puis éliminez les à l'aide des phagocytes. Vous pouvez forcer la libération d'anticorps en double-cliquant sur un lymphocyte B.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			objectif="réduire l'infection (durée 2 min)";
			
		} else {

			y=wrapText(ctxT,"Les anticorps", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Les plasmocytes libèreront spontanément leurs anticorps lorsqu'ils sont en présence de bactéries.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Ces anticorps vont alors se fixer sur les bactéries, les neutralisant : "+
			"leur déplacement sera réduit, elles pourront difficilement se diviser, voire finiront par mourir.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"De plus leur phagocytose par les macrophages sera grandement facilitée.", x, y, l, ht*1.5) ;
			y+=ht*3;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Utilisez les plasmocytes pour neutraliser les bacilles, puis éliminez les à l'aide des macrophages et mastocytes. Vous pouvez forcer la libération d'anticorps en double-cliquant sur un plasmocyte.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			objectif="réduire l'infection (durée 2 min)";

		}
	}
	
	if (etapeA==7)
	{
		// image trepo
		affIm (32);
		
		//texte
		ctxT.fillStyle="black";
		var ht=Math.round(h/20);
		ctxT.font="bold italic "+ht+"px "+mFont;
		var y=marge+ht*0.7;
		
		if (modeCollege) {
			y=wrapText(ctxT,"De nouveaux intrus", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Une surinfection s'est déclarée : une autre espèce bactérienne a contaminé le patient et se met à proliférer !!!", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Les anticorps produits précédemment sont inefficaces contre ces nouvelles bactéries.", x, y, l*0.7, ht*1.5) ;
			y+=ht*3;
			
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Utilisez les phagocytes pour limiter le développement des nouveaux attaquants, en attendant que des lymphocytes B spécifiques de ce nouvel agresseur arrivent.", x, y, l, ht*1.5) ;
			y+=ht*2;

			objectif="réduire l'infection (durée 1 min)";
		} else {
			y=wrapText(ctxT,"De nouveaux intrus", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Un nouveau foyer infectieux est apparu. Il ne s'agit pas de bacilles cette fois-ci, mais de bactéries appelées tréponèmes !", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Les anticorps dirigés contre les bacilles seront sans effet sur ces tréponèmes.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Utilisez les macrophages et les mastocytes pour limiter le développement des tréponèmes, en attendant que l'organisme développe des plasmocytes spécifiques de ce nouvel antigène.", x, y, l, ht*1.5) ;
			y+=ht*2;

			objectif="réduire l'infection (durée 1 min)";
		}
	}
	
	if (etapeA==8)
	{
		// image trepo
		affIm (36);
		//texte
		ctxT.fillStyle="black";
		var ht=Math.round(h/20);
		ctxT.font="bold italic "+ht+"px "+mFont;
		var y=marge+ht*0.7;
		
		if (modeCollege) {
			y=wrapText(ctxT,"Antibiotiques", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Utilisez lorsque vous le souhaitez la dose unique d'antibiotique mise à votre disposition (pastille en haut à droite de l'écran).", x, y, l*0.7, ht*1.5) ;
			y+=ht*3;
			
			objectif="réduire l'infection (durée 1 min)";
		} else {
			y=wrapText(ctxT,"Antibiotiques", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Pendant des décennies les humains ont fait un mauvais usage des antibiotiques, "+
			"les utilisant quand ce n'était pas nécessaire, ou sans prescription médicale.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Cette mauvaise pratique aura sélectionné les bactéries résistantes, "+
			"et à l'avenir de moins en moins d'antibiotiques seront efficaces.", x, y, l*0.7, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Un antibiogramme a été cependant réalisé à partir du sang de votre patient et "+
			"un antibiotique auquel les tréponèmes sont sensibles a été identifié.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Utilisez (au bon moment) la dose unique d'antibiotique mise à votre disposition (pastille en haut à droite de l'écran).", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			objectif="réduire l'infection (durée 1 min)";
		}
	}
	
	if (etapeA==9)
	{
		//texte
		ctxT.fillStyle="black";
		var ht=Math.round(h/20);
		ctxT.font="bold italic "+ht+"px "+mFont;
		var y=marge+ht*0.7;
		
		if (modeCollege) {
			y=wrapText(ctxT,"Les renforts, enfin ", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Il aura fallu plusieurs jours pour qu'arrivent les lymphocytes B capables de produire des anticorps spécifiques contre ces nouvelles bactéries, mais ça y est, ils sont là !", x, y, l*0.7, ht*1.5) ;
			y+=ht*3;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Utilisez les cellules sentinelles pour recruter les nouveaux lymphocytes B.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			objectif="recruter les nouveaux lymphocytes B";
		} else {
			y=wrapText(ctxT,"Les renforts, enfin ", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Il aura fallu plusieurs jours pour que l'organisme produise des plasmocytes capables de sécréter des anticorps dirigés contre les tréponèmes, mais ça y est, ils sont là !", x, y, l*0.7, ht*1.5) ;
			y+=ht*3;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Utilisez les mastocytes pour recruter les nouveaux plasmocytes.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			objectif="recruter les nouveaux plasmocytes";
		}
	}
	
	if (etapeA==10)
	{
		//texte
		ctxT.fillStyle="black";
		var ht=Math.round(h/20);
		ctxT.font="bold italic "+ht+"px "+mFont;
		var y=marge+ht*0.7;
		
		if (modeCollege) {
			y=wrapText(ctxT,"La dernière bataille", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Avec ces nouveaux lymphocytes B, éliminer ces bactéries sera un jeu d'enfant. La guérison est proche !", x, y, l*0.7, ht*1.5) ;
			y+=ht*3;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Eliminez toutes les bactéries.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			objectif="éliminer toutes les bactéries";
		} else {
			y=wrapText(ctxT,"La dernière bataille", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Avec ces nouveaux plasmocytes, éliminer les tréponèmes sera un jeu d'enfant. La guérison est proche !", x, y, l*0.7, ht*1.5) ;
			y+=ht*3;
			
			ht=Math.round(h/30);
			ctxT.font=ht+"px "+mFont;
			y=wrapText(ctxT,"Eliminez toutes les bactéries.", x, y, l, ht*1.5) ;
			y+=ht*2;
			
			objectif="éliminer toutes les bactéries";
		}
	}
	etapeAffiche=true;
	
	affBouton ();
	if (etape==0) {affSwitchCollege();}
	canvT.style.display="block";
}

function etapeSuiv()
{
	if (simpleRappelConsignes)
	{
		afficheEtape();
		simpleRappelConsignes=false;
		canvT.style.display="none";
		if (pause) {startAnim();}
		return false;
	}
	
	progression=0;
	etapeAffiche=false;
	if (etape==0)
	{
		etape++;
		afficheEtape();
		tempsAvantEtape=0;
		return false;
	}
	if (etape==1)
	{
		etape++;
		canvT.style.display="none";
		if (pause) {startAnim();}
		tempsAvantEtape=9999999;
		return false;		
	}
	if (etape==2)
	{
		etape++;
		for (var i=0;i<3;i++)
		{
			creeNouveauObj(0); //macrophages
		}
		canvT.style.display="none";
		if (pause) {startAnim();}
		tempsAvantEtape=9999999;
		return false;		
	}	
	
	if (etape==3)
	{
		etape++;
		for (var i=0;i<5;i++)
		{
			creeNouveauObj(3); // mastocytes
		}
		canvT.style.display="none";
		if (pause) {startAnim();}
		tempsAvantEtape=9999999;
		return false;		
	}
	
	if (etape==4)
	{
		etape++;
		for (var i=0;i<5;i++)
		{
			creeNouveauObj(2); // monocytes
		}
		canvT.style.display="none";
		if (pause) {startAnim();}
		tempsAvantEtape=9999999;
		return false;		
	}
	
	if (etape==5)
	{
		etape++;
		for (var i=0;i<3;i++)
		{
			creeNouveauObj(8); // plasmocytes sanguins
		}
		canvT.style.display="none";
		if (pause) {startAnim();}
		tempsAvantEtape=9999999;
		return false;		
	}
	
	if (etape==6)
	{
		etape++;
		canvT.style.display="none";
		if (pause) {startAnim();}
		tempsAvantEtape=25*60*2; // 3000 s avant ques les trépo arrivent
		return false;		
	}
	
	if (etape==7)
	{
		etape++;
		for (var i=0;i<nMaxBac*0.2;i++)
		{
			reveleCanv(tObj[11][i]); // on lache les trépo
		}
		cObj[11].n=nMaxBac*0.2;
		canvT.style.display="none";
		if (pause) {startAnim();}
		tempsAvantEtape=25*60; // 1 minute avant que l'antibio soit autorisé
		return false;		
	}
	
	if (etape==8)
	{
		etape++;
		// on affiche l'antibio
		canvA.style.display="block";
		canvT.style.display="none";
		if (pause) {startAnim();}
		tempsAvantEtape=25*60; // 1 minute avant ques les plasmo anti trepo arrivent
		return false;		
	}
	
	if (etape==9)
	{
		etape++; // plasmo anti trepo autorisés
		canvT.style.display="none";
		if (pause) {startAnim();}
		tempsAvantEtape=99999999;
		return false;		
	}

	if (etape==10)
	{
		etape++; // éliminer toutes bactéries
		canvT.style.display="none";
		if (pause) {startAnim();}
		tempsAvantEtape=99999999;
		return false;		
	}
	
}

function clic2Etape(x,y)
{
	var marge=canvT.height/20;
	var h=canvT.height-2*marge;
	var l=canvT.width-2*marge;
	var nIm=29;
	var lBouton=l/4;
	var hBouton=tImg[nIm].height/tImg[nIm].width*lBouton;
	var xBouton=(l-lBouton)/2+marge;
	var yBouton=h-hBouton+marge;
	
	if ((x<(xBouton+lBouton))&&(x>xBouton)&&(y>yBouton)&&(y<(yBouton+hBouton))) { // clic sur bouton
		if (fini) {window.location.reload();}
		else
		{etapeSuiv();}
	
		return false;
	}
	
	var nIm=37;
	var lBouton=l/20;
	var hBouton=tImg[nIm].height/tImg[nIm].width*lBouton;
	var ht=Math.round(hBouton*0.6);
	var xBouton=l-lBouton*2;
	var yBouton=marge;
	
	if ((etape==0)&&((x<(xBouton+lBouton))&&(x>xBouton)&&(y>yBouton)&&(y<(yBouton+hBouton)))) { // clic sur switch
		changeModeCol();
		return false;
	}
}

function changeModeCol () {
	console.log ("changement");
	if (modeCollege==true) {
		window.location.href="index.htm?mode=lycee"
	} else {
		window.location.href="index.htm?mode=college"
	}
}

function clicEtape(e)
{// clic souris etape
	is_touch_device=false;
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

	clic2Etape(x,y);
}

function toucheEtape (e)
{// touche ecran etape
	is_touch_device=true;
	var x;
	var y;
	e.preventDefault();
	
	x = e.targetTouches[0].pageX;
	y = e.targetTouches[0].pageY;
	
	x -= canvT.offsetLeft;
	y -= canvT.offsetTop;
		
	clic2Etape (x,y);
}

function demo()
{
	etape=0;
	
	for (var i=0;i<10;i++)
	{
		etapeSuiv();
	}

	
}