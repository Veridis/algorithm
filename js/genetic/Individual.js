const RADIUS_RANGE = 10;

const CHANCE_TO_MUTATE = 0.1;
const MAX_MUTATION = 5;
const GRADED_RETAIN_PERCENT = 0.5;
const CHANCE_RETAIN_NONGRATED = 0.01;

function Individual()
{
	this.winner = false;
	this.genes = [];
}

Individual.prototype.generate = function()
{
	for (var t = -PI; t <= PI; t += TWO_PI / 20) {
		var gene = random(target.genes.min(), target.genes.max());
		this.genes.push(gene);
	}
}

Individual.prototype.crossover = function(father, mother)
{
	for(var i = 0; i < father.genes.length; i++) {
		if (i % 2 === 0) {
			this.genes.push(father.genes[i]);
		} else {
			this.genes.push(mother.genes[i]);
		}
	}
}

Individual.prototype.mutate = function(number)
{
	for (var i = 0; i < number; i ++) {
		var index = floor(random(this.genes.length));
		this.genes[index] = random(target.genes.min(), target.genes.max());
	}
}

Individual.prototype.fitness = function()
{
	var fitness = 0;
	for(var i = 0; i < this.genes.length; i ++) {
		var dist = abs(this.genes[i] - target.genes[i]);
		fitness += 100 - map(dist, 0, target.genes[i], 0, 100);
	}
	if (fitness == 0 ) {
		console.log(this);
	}

	return fitness / this.genes.length;
}

Individual.prototype.draw = function(center)
{
	var i = 0;
	if (this.winner) {
		stroke(100, 0, 255);
		fill(100, 0, 255);	
	}
	beginShape();
	for (var t = -PI; t <= PI; t += TWO_PI / 20) {
		var x = this.genes[i] * sin(t);
		var y = this.genes[i] * cos(t);
		vertex(center.x + x, center.y + y);
		i++;
	}
	endShape();

	stroke(200);
	fill(200);
}