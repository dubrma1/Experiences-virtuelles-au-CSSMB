var tFleche=new Array();

function rafrFleches()
{
	ctxF.clearRect (0,0,lCanv,hCanv);
	ctxF.strokeStyle="black";
	ctxF.lineWidth=1;
	var x0,x1,y0,y1;
	var angle;
	var o=new Object();
	var f=new Object();
	for (var i=0;i<nTObj;i++)
	{
		if (cObj[i].sel)
		{
			for (var n=0;n<tObj[i].length;n++)
			{
				o=tObj[i][n];
				f=o.fleche;
				if (f.v)
				{
					x0=o.x*zF;
					y0=o.y*zF;
					x1=f.x*zF;
					y1=f.y*zF;
					ctxF.save();
					ctxF.translate (-xDec*zF,-yDec*zF);
					ctxF.beginPath();
					ctxF.moveTo(x0,y0);
					ctxF.lineTo(x1,y1);
								
					angle = Math.atan2((y1-y0),(x1-x0));
					x0=x1+Math.cos(angle+5*PI/6)*pointeF;
					y0=y1+Math.sin(angle+5*PI/6)*pointeF;
					ctxF.lineTo(x0,y0);
					ctxF.moveTo(x1,y1);
					x0=x1+Math.cos(angle-5*PI/6)*pointeF;
					y0=y1+Math.sin(angle-5*PI/6)*pointeF;
					ctxF.lineTo(x0,y0);	
					
					ctxF.stroke();
					ctxF.restore();
				}
			}
		}
	}
}