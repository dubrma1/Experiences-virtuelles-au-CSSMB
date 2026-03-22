function getVendorPrefix()
{
	var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;

	var someScript = document.getElementsByTagName('script')[0];

	for(var prop in someScript.style)
	{
		if(regex.test(prop))
		{
			// test is faster than match, so it's better to perform
			// that on the lot and match only when necessary
			return prop.match(regex)[0];
		}

	}

	// Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
	// However (prop in style) returns the correct value, so we'll have to test for
	// the precence of a specific property
	if('WebkitOpacity' in someScript.style) return 'Webkit';
	if('KhtmlOpacity' in someScript.style) return 'Khtml';

	return '';
}

function wrapText(context, texte, x, y, maxWidth, lineHeight) 
{
	context.fillStyle="rgba(255,255,255,0.25)";
	var decWrap=canv.width/1000;
	for (var i=-2;i<=2;i++)
	{
		for (var j=-2;j<=2;j++)
		{
			wrapText2(context, texte, x+i*decWrap, y+j*decWrap, maxWidth, lineHeight);
		}
	}
	context.fillStyle="black";
	var y=wrapText2(context, texte, x, y, maxWidth, lineHeight);
	return y;
}


function wrapText2(context, texte, x, y, maxWidth, lineHeight) 
{
	var words = texte.split(' ');
	var line = '';

	for(var n = 0; n < words.length; n++) {
	var testLine = line + words[n] + ' ';
	var metrics = context.measureText(testLine);
	var testWidth = metrics.width;
	if (testWidth > maxWidth && n > 0) {
	context.fillText(line, x, y);
	line = words[n] + ' ';
	y += lineHeight;
	}
	else {
	line = testLine;
	}
	}
	context.fillText(line, x, y);
	return y;
}

function dAngle(a1,a2)
{
	var b2=a2-a1;
	b2=(b2+4*PI)%(2*PI);
	return b2;
}