const CHILD_NUMBER = 75;

function Firework() 
{
	this.hu = random(255);
	//this.firework = new Particle(map(musicCentroid, 0, 1, 0, width), height, this.hu, true);
	this.firework = new Particle(random(width), height, this.hu, true);
	this.exploded = false;
	this.particles = [];
}

Firework.prototype.update = function() 
{
	// Main particle
	if (!this.exploded) { 
		this.firework.applyForce(gravity);
		this.firework.update();
		if (this.firework.vel.y >= 0) {
			this.exploded = true;
			this.explode();
		}
	}
	// Childs particles
	for (var i = this.particles.length-1; i >= 0; i-- ) {
		this.particles[i].applyForce(gravity);
		this.particles[i].update();
		if (this.particles[i].done()) { 	// On suprime la particule si elle est complètement effacée
			this.particles.splice(i, 1);
		}
	}
 }

Firework.prototype.done = function() 
{
	return (this.exploded && this.particles.length === 0);
}

Firework.prototype.explode = function() 
{
	if (this.isRed()) {
		this.createHeartExplosion();
	} else if (this.isYellow()) {
		this.createStarExplosion();
	} else {
		if (frameCount % 20 == 0) {
			this.createButterflyExplosion();
		} else {
			this.createeRandomExplosion();
		}
	}
 }

Firework.prototype.show = function() 
{
	if (!this.exploded) { 
		this.firework.show();
	}
	for (var i = 0; i < this.particles.length; i++ ) {
		this.particles[i].show();
	}
}

Firework.prototype.createHeartExplosion = function() 
{
	var heartSize = 3.5;
	for (var t = -PI; t <= PI; t += 0.05) {
		var x = pow(sin(t), 3) * heartSize;													// x = 16 * sin^3(t)
		var y = (-13 * cos(t) + 5 * cos(2*t) + 2 * cos(3*t) + cos(4*t)) / 16 * heartSize;	// y = 13cos(t) - 5 * cos(2t) -2cos(3t) - cos(4*t)
		var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu);
		velocity = createVector(x, y - 3);
		velocity.mult(random(1.05, 1.2));
		p.vel = velocity;
		p.fadeVel = 7;
		this.particles.push(p);
	}
}

Firework.prototype.createStarExplosion = function() 
{
	var starSize = 2.5;
	for (var t = -PI; t <= PI; t += 0.05) {
		var x = 0.25 * (3*cos(t) + cos(3*t)) * starSize;
		var y = 0.25 * (3*sin(t) - sin(3*t)) * starSize;
		var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu);
		velocity = createVector(x, y - 3);
		velocity.mult(random(1.05, 1.1));
		p.vel = velocity;
		p.fadeVel = 7;
		this.particles.push(p);
	}
}

Firework.prototype.createButterflyExplosion = function()
{
	var butterflySize = 1.2;
	for (var t = -PI; t <= PI; t += 0.05) {
		var x = sin(t) * (exp(cos(t)) - 2*cos(4*t) - pow(sin(t/12), 5)) * butterflySize;
		var y = -cos(t) * (exp(cos(t)) - 2*cos(4*t) - pow(sin(t/12), 5)) * butterflySize;
		var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu);
		velocity = createVector(x, y);
		velocity.mult(random(1.05, 1.1));
		p.vel = velocity;
		p.fadeVel = 7;
		this.particles.push(p);
		
	}
}
Firework.prototype.createeRandomExplosion = function() 
{
	for (var i = 0; i < CHILD_NUMBER; i++ ) {
 		var p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu);
 		this.particles.push(p);
 		// velocity is set in constructor
 	}
}

Firework.prototype.isRed = function() 
{
	var color = map(this.hu, 0, 255, 0, 360);

	return color <= 15 || color >= 330;
}

Firework.prototype.isYellow = function()
{
	var color = map(this.hu, 0, 255, 0, 360);

	return color >= 35 && color <= 65;
}
