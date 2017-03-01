const FIREWORK_ANGLE = 1.5;
const SINUSOID_FACTOR = 1;

function Particle(x, y, hu, firework)
{
	this.pos = createVector(x,y);
	this.firework = firework;				// isMain Particle ?
	this.lifespan = 255;					// durée de vie d'une petite particule (opacité)
	this.hu = hu;							// Couleur
	this.fadeVel = random(2, 8);			// Vitesse de disparition des childs

	if (this.firework) {
		this.vel = this.getRandomInitialVel();
	} else {
		this.vel = p5.Vector.random2D();
		this.vel.mult(random(0.5, 10));
	}

	this.acc = createVector(0,0);
}

Particle.prototype.update = function() 
{
	if (!this.firework) {
		this.vel.mult(0.95);
		this.lifespan -= this.fadeVel;
	}
	this.vel.add(this.acc);
	this.pos.add(this.vel);
	this.acc.mult(0);
}

Particle.prototype.done = function() 
{
	return this.lifespan < 0;
}

Particle.prototype.show = function() 
{
	var modifier = createVector(0, 0);
	if (!this.firework) {
		strokeWeight(2);
		stroke(this.hu, 255, 255, this.lifespan);
	} else {
		modifier.x = this.sinusoid();
		strokeWeight(4);
		stroke(this.hu, 255, 255);
	}
	
	this.pos.add(modifier);
	point(this.pos.x, this.pos.y);
}


Particle.prototype.applyForce = function(force) 
{
	this.acc.add(force);
}

Particle.prototype.getRandomInitialVel = function() 
{
	var factor = 10;
	return createVector(
		random(-FIREWORK_ANGLE, FIREWORK_ANGLE), // X velocity
		// random(max(-15.5,  -15.5 * musicAmplitude * factor), max(-13.5,  -13.5 * musicAmplitude * factor))
		// random(-15,5, -13,5)
		random(-10 - factor * musicAmplitude, - 8 - factor * musicAmplitude)
	)
}

Particle.prototype.sinusoid = function()
{
	var time = millis() % 360;
	var value = map(time, 0, 360, 0, TWO_PI);

	return SINUSOID_FACTOR * sin(value)
}
