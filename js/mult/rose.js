const FILM_SPEED = 0.025;

function Rose(table, modulo, r) 
{
	this.table = table;
	this.modulo = modulo;
	this.radius = r || 250;
}

Rose.prototype.update = function(table, modulo) 
{
	this.table = table;
	this.modulo = modulo;
}

Rose.prototype.film = function() 
{
	this.table += FILM_SPEED;
	tableSlider.value(this.table);
	moduloSlider.value(this.modulo);
}

Rose.prototype.show = function()
{
	this.drawCircle(this.radius);
	for(t = -PI/2; t < 3*PI/2; t += (TWO_PI / this.modulo)) {
		this.drawPoint(t);
		this.drawIndex(t);
		this.drawLine(t);
	}
	this.printState();
}

Rose.prototype.drawCircle = function(r)
{
	stroke(0);
	strokeWeight(3);
	noFill();
	translate(width/2, height/2);
	ellipse(0, 0, 2*r, 2*r);
}

Rose.prototype.drawPoint = function(t)
{
	var p = this.getPosition(t);
	strokeWeight(4);
	push();
	stroke(this.getColor(t), 255, 255);
	point(p.x, p.y);
	pop();
}

Rose.prototype.drawIndex = function(t)
{
	textSize(10);
	textAlign(CENTER);
	strokeWeight(0.5);
	

	// Définition de la position du texte
	textPos = this.getPosition(t);
	textPos.mult(1.15);

	//Nombre à afficher
	var number = this.tToIndex(t)

	//Définition de l'angle de rotation
	v = createVector(0, -1);
	angle = p5.Vector.angleBetween(v, textPos);
	angle = number <= this.modulo / 2 ? angle : - angle;

	// Rotation
	push();
	fill(this.getColor(t), 255, 255);

	translate(textPos.x, textPos.y);
	rotate(angle);
	text(number, 0, 0);
	pop();
}

Rose.prototype.drawLine = function(t)
{
	push();
	if (colorise.checked() ) {
		colorMode(HSB, 255, 255, 255, 255);
		stroke(this.getColor(t), 255, 255, 150);
		strokeWeight(1);
	} else {
		stroke(200);
		strokeWeight(0.5);
	}

	
	// Récupération des index des points 1 et 2 (départ et cible)
	var i1 = this.tToIndex(t) % this.modulo;
	var i2 = i1 * this.table % this.modulo;

	// Conversion en t
	var t1 = this.indexToT(i1);
	var t2 = this.indexToT(i2);

	// Création des vecteurs positions
	var p1 = createVector(this.radius * cos(t1), this.radius * sin(t1));
	var p2 = createVector(this.radius * cos(t2), this.radius * sin(t2));

	// Affichage
	line(p1.x, p1.y, p2.x, p2.y)
	pop();
}

Rose.prototype.printState = function() {
	textAlign(RIGHT);
	fill(71, 141, 255);
	text('framerate : ' + frameRate().toFixed(2), 250, -270);
	text('table : ' + this.table.toFixed(2), 250, -260);
	text('modulo : ' + this.modulo, 250, -250);
}

Rose.prototype.getPosition = function(t)
{
	return createVector(this.radius * cos(t), this.radius * sin(t));
}

Rose.prototype.getColor = function(t) 
{
	colorMode(HSB, 255, 255, 255, 255);

	return round(map(t, -PI/2, 3*PI/2, 0, 255));
}

Rose.prototype.tToIndex = function(t)
{
	return round(map(t, -PI/2, 3*PI/2, 0, this.modulo));
}

Rose.prototype.indexToT = function(i)
{
	return map(i, 0, this.modulo, -PI/2, 3*PI/2);
}