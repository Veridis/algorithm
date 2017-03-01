const GENERATION_COUNT_MAX = 5000;

var population;
var target;		// optimal solution

function setup()
{
	createCanvas(1000, 400);
	background(51);
	
	strokeWeight(2);
	
	target = new Individual();
	// Random
	//target.genes = new Array(21);
	//target.genes.fill(random(3, 15));
	for (var t = -PI; t <= PI; t += TWO_PI / 20) {
		var a = random(0, 20);
		target.genes.push(random(3, 15));
	}
//	target.genes.sort();

	stroke(200);
	fill(200);

	frameRate(5);

	population = new Population(true);
	//population.evolve();
	console.log('Starting : ' + population.getAverageFitness());
	//console.log(population.individuals[0].fitness());
}


function draw() 
{
	background(51);

	population.evolve();
	console.log('Generation ' + frameCount + ' : ' + population.getAverageFitness() + ' — Best : ' + population.getFittest());

	stroke(0, 200, 100);
	fill(0, 200, 100);
	target.draw(createVector(width - 2*RADIUS_RANGE, height - 2*RADIUS_RANGE));

	stroke(200);
	fill(200);
	population.draw();
}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};
