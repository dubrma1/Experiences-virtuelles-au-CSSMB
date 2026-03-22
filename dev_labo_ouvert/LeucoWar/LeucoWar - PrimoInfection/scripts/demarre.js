var modeCollege;
var nbImagesChargees=0;
var tImages=new Array;
var tImg=new Array;
var timerAnim;
var timerResize;
var PI=Math.PI;

const nTObj=13;
var tObj=new Array();
for (var i=0;i<nTObj;i++) {tObj[i]=new Array();}
var cObj=new Array;
for (var i=0;i<nTObj;i++)
{
	cObj[i]=new Object();
	cObj[i].n=0;
}
cObj[0].nIm=0;
cObj[0].sel=true;
cObj[1].nIm=1;
cObj[1].sel=false; // bacille ac
cObj[2].nIm=2; // monocyte
cObj[2].sel=true;
cObj[3].nIm=3; // mastocyte
cObj[3].sel=true;
cObj[4].nIm=4;	// bacille
cObj[4].sel=false;
cObj[5].nIm=5;
cObj[5].sel=false;
cObj[6].nIm=6; // hématie
cObj[6].sel=false;
cObj[7].nIm=21; // bacille mort
cObj[7].sel=false;
cObj[8].nIm=22; // plasmo sang
cObj[8].sel=true;
cObj[9].nIm=22; // plasmo tissus
cObj[9].sel=true;
cObj[10].nIm=23; // leuco mort
cObj[10].sel=false;
cObj[11].nIm=30;	// treponeme
cObj[11].sel=false;
cObj[12].nIm=31;	// treponeme ac
cObj[12].sel=false;

function imageChargee()
{
	nbImagesChargees++;
	ctx.fillStyle="rgb(200,200,200)";
	ctx.fillRect(canv.width*0.1,canv.height/40,canv.width*0.8,canv.height/40);
	ctx.fillStyle="black";
	ctx.fillRect(canv.width*0.1,canv.height/40,canv.width*0.8*nbImagesChargees/tImages.length,canv.height/40);
	if (nbImagesChargees>=tImages.length)
	{ 
		demarre();
	}
}

function chargeUneImage(i)
{
	tImg[i] = new Image();
	var o=tImages[i];
	if (!o.src=="")
	{
		if (modeCollege) {
			if (o.src=="plasmoac.jpg") {o.src="plasmoac2.jpg";}
			if (o.src=="exocytose.jpg") {o.src="exocytose2.jpg";}
			if (o.src=="infla.jpg") {o.src="infla2.jpg";}
		}
		tImg[i].src = "images/"+o.src;
		tImg[i].onload = function(){
			imageChargee();
		}
	}
	i++;
	if (i<tImages.length) {setTimeout(function(){chargeUneImage(i)},1)}
}

function chargeImages ()
{
	tImages[0]={nom:"macrophage",src:"macrophage0.png",tRel:1};
	tImages[1]={nom:"bacille ac",src:"bacille_ac.png",tRel:0.35};
	tImages[2]={nom:"monocyte",src:"monocyte.png",tRel:0.8};
	tImages[3]={nom:"mastocyte",src:"mastocyte.png",tRel:0.9};
	tImages[4]={nom:"bacille",src:"bacille.png",tRel:0.3};
	tImages[5]={nom:"cellule endothéliale",src:"endoth.png",tRel:2};
	tImages[6]={nom:"hématie",src:"hematie.png",tRel:0.3};
	tImages[7]={nom:"texture cellules",src:"cells-5.jpg",tRel:1};
	tImages[8]={nom:"texture cellules",src:"cells-red.jpg",tRel:1};
	tImages[9]={nom:"macrophage1",src:"macrophage1.png",tRel:1};
	tImages[10]={nom:"macrophage2",src:"macrophage2.png",tRel:1};
	tImages[11]={nom:"macrophage3",src:"macrophage3.png",tRel:1};
	tImages[12]={nom:"macrophage4",src:"macrophage4.png",tRel:1};
	tImages[13]={nom:"macrophage5",src:"macrophage5.png",tRel:1};
	tImages[14]={nom:"mastocyte",src:"mastocyte1.png",tRel:0.9};
	tImages[15]={nom:"mastocyte",src:"mastocyte2.png",tRel:0.9};
	tImages[16]={nom:"mastocyte",src:"mastocyte3.png",tRel:0.9};
	tImages[17]={nom:"mastocyte",src:"mastocyte4.png",tRel:0.9};
	tImages[18]={nom:"mastocyte",src:"mastocyte5.png",tRel:0.9};
	tImages[19]={nom:"mastocyte",src:"mastocyte6.png",tRel:0.9};
	tImages[20]={nom:"mastocyte",src:"mastocyte7.png",tRel:0.9};
	tImages[21]={nom:"bacille mort",src:"bacille_mort.png",tRel:0.4};
	tImages[22]={nom:"plasmocyte",src:"plasmocyte.png",tRel:0.8};
	tImages[23]={nom:"leucocyte mort",src:"leucomort.png",tRel:1};
	tImages[24]={nom:"inflammation",src:"infla.jpg",tRel:1};
	tImages[25]={nom:"tue bactéries",src:"tuebacteries.jpg",tRel:1};
	tImages[26]={nom:"controle macro",src:"controlemacro.jpg",tRel:1};
	tImages[27]={nom:"controle macro",src:"exocytose.jpg",tRel:1};
	tImages[28]={nom:"plasmo ac",src:"plasmoac.jpg",tRel:1};
	tImages[29]={nom:"bouton",src:"bouton.png",tRel:1};
	tImages[30]={nom:"treponeme",src:"treponeme.png",tRel:0.4};
	tImages[31]={nom:"treponeme_ac",src:"treponeme_ac.png",tRel:0.4};
	tImages[32]={nom:"trepo",src:"trepo.jpg",tRel:1};
	tImages[33]={nom:"mort",src:"mort.jpg",tRel:1};
	tImages[34]={nom:"arc en ciel",src:"rainbow.jpg",tRel:1};
	tImages[35]={nom:"fond microbes",src:"fondmicrobes.jpg",tRel:1};
	tImages[36]={nom:"antibiotique",src:"antibio.jpg",tRel:1};
	tImages[37]={nom:"switch",src:"switch.png",tRel:1};
	tImages[38]={nom:"switch2",src:"switch2.png",tRel:1};

	var i=0;
	setTimeout(function(){chargeUneImage(i)},1)
}

function demarre()
{
	timerResize=setInterval(function(){testRedim()},1000);
	assignEvent();
	creeTCanv(true);
	
	for (var i=0;i<100;i++)
	{
		creeNouveauObj(6); //hématies
	}
	
	for (var i=0;i<(nMaxBac);i++)
	{
		creeNouveauObj(4); // bactéries
		creeNouveauObj(1); // bactéries avec Ac
		creeNouveauObj(7); // bactéries mortes
		creeNouveauObj(11); // treponemes
		creeNouveauObj(12); // treponemes avec Ac
	}
	// on ne garde qu'une partie des bactéries
	for (var i=nMaxBac/4;i<nMaxBac;i++)
	{
		cacheCanv(tObj[4][i]);
	}
	cObj[4].n=nMaxBac/4;
	// et aucun bacille mort ni ac
	for (var i=0;i<nMaxBac;i++)
	{
		cacheCanv(tObj[7][i]);
		cacheCanv(tObj[1][i]);
		cacheCanv(tObj[11][i]);
		cacheCanv(tObj[12][i]);
	}		
	
	creeVaisseau();
	fond();
	initAntibio();
	etape=0;
	pause=false;
	afficheAuteur ();
	anim();
	
	//demo();
	//return false;
	afficheEtape();
	
	return false;
}

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") {
        return;
    }

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}
