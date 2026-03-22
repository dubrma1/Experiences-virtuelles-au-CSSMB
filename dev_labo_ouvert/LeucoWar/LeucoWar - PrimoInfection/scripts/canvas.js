var pointeF;

var is_touch_device=true;
var aura=true;

var mFont="Trebuchet MS";
var fini=false;
var simpleRappelConsignes=false;

var fps=25;
var fsMax=8;
var fsMin=1;
var frameSkip=fsMin;

var tCanv=new Array();

var canv=document.getElementById("canv");
var ctx=canv.getContext("2d");

var canvI=document.getElementById("canvI");
var ctxI=canvI.getContext("2d");

var canvAuteur=document.getElementById("canvAuteur");
var ctxAuteur=canvAuteur.getContext("2d");

var canvClic=document.getElementById("canvClic");
var ctxClic=canvClic.getContext("2d");

var canvF=document.getElementById("canvF");
var ctxF=canvF.getContext("2d");
var canvM=document.getElementById("canvM");
var ctxM=canvM.getContext("2d");

var canvD=document.getElementById("canvD");
var ctxD=canvD.getContext("2d");

var canvA=document.getElementById("canvA");
var ctxA=canvA.getContext("2d");

var canvT=document.getElementById("canvT");
var ctxT=canvT.getContext("2d");

// on teste si les rotations de canvas sont supportées
var vPre=getVendorPrefix();
var html5OK=false;
if ( (vPre=="Webkit")||(vPre=="Moz")||(vPre=="O")||(vPre=="ms") )
{
	// on essaie une rotation
	if (vPre=="Webkit") 
	{html5OK=(!!(canvA.style.webkitTransform="rotate(0deg)")===true);}
	else if (vPre=="Moz") {html5OK=(!!(canvA.style.MozTransform="rotate(0deg)")===true);}
	else if (vPre=="O") {html5OK=(!!(canvA.style.OTransform="rotate(0deg)")===true);}
	else if (vPre=="ms") {html5OK=(!!(canvA.style.msTransform="rotate(0deg)")===true);}
}

if (!html5OK)
{
	document.getElementById("divnocanvas").style.display="block";
	document.getElementById("divcanvas").style.display="none";
	throw { name: 'FatalError', message: 'Ce navigateur ne pourra pas lancer cette application' };
}


var lCanv=window.innerWidth;
var hCanv=window.innerHeight;
var minCanv;

// a supprimer
var hTerr=hCanv*1.15;
var lTerr=hTerr*4;
// fin à supprimer

var xMax=lTerr;
var yMax=hTerr;

var xS=xMax/2;
var yS=yMax/2;

var zF=hTerr/yMax;

var margeVaiss=yMax*0.03;

var tBase=yMax/15;

var xDec=Math.round(xMax/3);
var yDec=Math.round(yMax-hCanv/zF);
if (yDec<0) {yDec=0;}

var vit=tBase/30;
var seuilPhago=vit*300;

if (navigator.userAgent.match(/iPad/i)== null )
{
	document.body.style.overflow="hidden";
}

function redrawAllCanv()
{
	for (var i=0;i<nTObj;i++)
	{
		var nIm=cObj[i].nIm;
		var l=tCanv[nIm].width;
		var h=tCanv[nIm].height;
		for (var j=0;j<tObj[i].length;j++)
		{
			var o=tObj[i][j];
			o.ctx.clearRect(0,0,o.canv.width,o.canv.height);
			o.canv.width=l;
			o.canv.height=h;
			o.ctx.clearRect(0,0,l,h);
			o.ctx.drawImage(tCanv[nIm],0,0);
		}
	}
}

function creeTCanv(cree)
{
	// astuce pour de l'antialiasing maison
	for (var nIm=0;nIm<tImages.length;nIm++)
	{
		if (cree) {tCanv[nIm]=document.createElement('canvas');}
		
		var l=tBase*zF*tImages[nIm].tRel;
		var h=l*tImg[nIm].height/tImg[nIm].width;
		
		var tCtx = tCanv[nIm].getContext('2d');
		
		tCtx.clearRect(0,0,tCanv[nIm].width,tCanv[nIm].height);
		
		tCanv[nIm].width=l;
		tCanv[nIm].height=h;
		var margel=l/10;
		var margeh=h/10;
		l=l-margel*2;
		h=h-margeh*2;
		
		tCtx.imageSmoothingEnabled = true;
		tCtx.globalAlpha=1;
		tCtx.drawImage(tImg[nIm],0,0,tImg[nIm].width,tImg[nIm].height,margel,margeh,l,h);
		tCtx.globalAlpha=0.25;
		var d=hTerr/1500;
		
		tCtx.clearRect(0,0,tCanv[nIm].width,tCanv[nIm].height);
		
		tCtx.drawImage(tImg[nIm],0,0,tImg[nIm].width,tImg[nIm].height,margel+d*0.7,margeh+d*0.7,l,h);
		tCtx.drawImage(tImg[nIm],0,0,tImg[nIm].width,tImg[nIm].height,margel-d*0.7,margeh-d*0.7,l,h);
		tCtx.drawImage(tImg[nIm],0,0,tImg[nIm].width,tImg[nIm].height,margel-d*0.7,margeh+d*0.7,l,h);
		tCtx.drawImage(tImg[nIm],0,0,tImg[nIm].width,tImg[nIm].height,margel+d*0.7,margeh-d*0.7,l,h);		
		tCtx.drawImage(tImg[nIm],0,0,tImg[nIm].width,tImg[nIm].height,margel+0,margeh+d,l,h);
		tCtx.drawImage(tImg[nIm],0,0,tImg[nIm].width,tImg[nIm].height,margel+0,margeh-d,l,h);
		tCtx.drawImage(tImg[nIm],0,0,tImg[nIm].width,tImg[nIm].height,margel-d,margeh+0,l,h);
		tCtx.drawImage(tImg[nIm],0,0,tImg[nIm].width,tImg[nIm].height,margel+d,margeh+0,l,h);
		tCtx.globalAlpha=1;
	}
}


function fond()
{
	var x;
	ctx.clearRect(0,0,lCanv,hCanv);
	ctx.save();
	ctx.translate (-xDec*zF,-yDec*zF);
	ctx.fillStyle = ctx.createPattern(tImg[7], "repeat");
	ctx.globalAlpha=0.2;
	ctx.fillRect(0,0,lTerr,hTerr);
	// fond vaisseau
	ctx.beginPath();
	ctx.moveTo(lTerr,hTerr);
	ctx.lineTo(0,hTerr);
	for (var i=0;i<=100;i++)
	{
		x=i/100*lTerr;
		y=yVaiss[i]*zF;
		ctx.lineTo(x,y);
	}
	ctx.lineTo(lTerr,hTerr);
	ctx.closePath;
	ctx.fillStyle = ctx.createPattern(tImg[8], "repeat");
	ctx.fill();
	//ctx.fillRect(0,hTerr*0.795,lTerr,hTerr*0.205);
	ctx.restore();
}

function message(t,y)
{
	var h=20;
	ctxClic.clearRect (0,y*h,lCanv,h);
	ctxClic.font=Math.round(h*0.8)+"px Trebuchet";
	ctxClic.fillStyle="black";
	ctxClic.fillText (t,h,y*h+h);
}

function afficheAuteur ()
{
	canvAuteur.height=Math.round(hCanv*0.07);
	canvAuteur.width=lCanv;
	canvAuteur.style.top=Math.round(hCanv-canvAuteur.height*1.55)+"px";
	canvAuteur.style.left="0px";
	ctxAuteur.font="italic "+Math.round(canvAuteur.height*0.4)+"px "+mFont;
	ctxAuteur.textAlign="right";
	//ctxAuteur.fillRect(0,0,canvAuteur.width,canvAuteur.height);
	ctxAuteur.fillStyle="rgba(255,255,255,0.025)";
	var t="Auteur : P.COSENTINO   ";
	var t2="Textes : R.GILLIE   ";
	var decT=canvAuteur.height/30;
	for (var i=-3;i<=3;i++) {
		for (var j=-3;j<=3;j++) { 
			if (modeCollege) {
				ctxAuteur.fillText(t,lCanv+i*decT,canvAuteur.height*0.4+j*decT);
				ctxAuteur.fillText(t2,lCanv+i*decT,canvAuteur.height*0.8+j*decT);
			} else {
				ctxAuteur.fillText(t,lCanv+i*decT,canvAuteur.height*0.8+j*decT);
			}
		}
	}
	ctxAuteur.fillStyle="rgba(0,0,0,0.3)";
	if (modeCollege) {
		ctxAuteur.fillText(t,lCanv+i*decT,canvAuteur.height*0.4+j*decT);
		ctxAuteur.fillText(t2,lCanv+i*decT,canvAuteur.height*0.8+j*decT);		
	} else {
		ctxAuteur.fillText(t,lCanv,canvAuteur.height*0.9);
	}
}


function redimCanvas()
{
	minCanv=lCanv;
	if (hCanv<minCanv) {minCanv=hCanv;}
	
	canv.width=lCanv;
	canv.height=hCanv;
	
	//canv.style.left="0px";
	//canv.style.top="0px";

	canvA.height=hCanv*0.07;
	canvA.width=canvA.height;
	canvA.style.left=Math.round(lCanv-canvA.width)+"px";

	canvA.addEventListener("touchstart", admAntibio, false);
	canvA.addEventListener("mousedown", admAntibio, false);
	canvA.addEventListener("mousemove", survolAntibio, false);

	canvD.height=hCanv*0.08;
	canvD.width=canvD.height*20;
	if (canvD.width>(lCanv-canvA.width)) {canvD.width=(lCanv-canvA.width);}
	canvD.style.left="0px";
	canvD.style.top=Math.round(canvD.width*0.01)+"px";

	canvI.height=Math.round(hCanv*0.025);
	canvI.width=Math.round(canvI.height*8);
	canvI.style.left=Math.round(lCanv*0.01)+"px";
	canvI.style.top=Math.round(hCanv*0.1)+"px";

	canvClic.width=lCanv;
	canvClic.height=hCanv;

	canvF.width=lCanv;
	canvF.height=hCanv;

	canvM.width=lCanv;
	canvM.height=hCanv;

	canvT.width=lCanv;
	canvT.height=canvT.width*3/4;

	while ((canvT.width>lCanv)||(canvT.height>hCanv))
	{
		canvT.width=canvT.width*0.98;
		canvT.height=canvT.width*3/4;
	}
	canvT.width=canvT.width*0.95;
	canvT.height=canvT.width*3/4;

	canvT.style.top=Math.round((hCanv-canvT.height)/2)+"px";
	canvT.style.left=Math.round((lCanv-canvT.width)/2)+"px";

	hTerr=Math.round(hCanv*1.15);
	lTerr=Math.round(hTerr*4);

	zF=hTerr/yMax;
	
	pointeF=Math.round(minCanv/100);
}

function assignEvent()
{
	// resize
	//window.onresize=function() {
	//	if (resiz){clearTimeout(resiz)};
	//	resiz = setTimeout(function(){redim();},500);
	//};

	// empecher le scroll
	document.body.style.overflow="hidden";
	if(window.addEventListener){
		window.addEventListener('DOMMouseScroll',wheel,false);
	}
	window.onmousewheel=document.onmousewheel=wheel;
	// fin scroll

	canvClic.addEventListener("touchstart", doTouchStart, false);
	canvClic.addEventListener("touchmove", doTouchMove, false);
	canvClic.addEventListener("touchend", clicLeve, false);
	canvClic.addEventListener("mousedown", clicSouris, false);
	canvClic.addEventListener("mouseup", clicLeve, false);
	document.addEventListener("mouseout", survolSorti, false);
	canvClic.addEventListener("mousemove", survolCanvas, false);


	canvT.addEventListener("mousedown", clicEtape, false);
	canvT.addEventListener("mousemove", survolEtape, false);
	canvT.addEventListener("touchstart", toucheEtape, false);
}