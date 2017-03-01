const POPULATION_COUNT = 175;
const GRADED_INDIVIDUAL_RETAIN_COUNT = parseInt(POPULATION_COUNT * GRADED_RETAIN_PERCENT);    // Le nombre d’individus « hauts gradés » à retenir

const FITNESS_CAP = 99;

function Population(first)
{
	this.individuals = [];
	// Initialise population
    var colSize = width / (4 * RADIUS_RANGE);
    var rowSize = POPULATION_COUNT / colSize;
    var d = RADIUS_RANGE * 4;
    if (first) {
        for (var j = 0; j < rowSize; j++) {
            for (var i = 0; i < colSize; i++) {
                var individual = new Individual();
                individual.generate();
                this.individuals.push(individual);
            }
        }
    }
}

Population.prototype.evolve = function() 
{
    var rawGradedPopulation = this.sort();
    var averageGrade = 0;
    var solutions = [];
    var gradedPopulation = [];
    for (var i = 0; i < rawGradedPopulation.length; i++) {
        averageGrade += rawGradedPopulation[i].fitness;
        gradedPopulation.push(rawGradedPopulation[i].individual)
        if (rawGradedPopulation[i].fitness > FITNESS_CAP) {
            rawGradedPopulation[i].individual.winner = true;
            solutions.push(rawGradedPopulation[i].individual);
        }
    }
    averageGrade /= POPULATION_COUNT;

    if (solutions.length > 0) {
        console.log('GG', this, solutions);
        noLoop();
        // TODO return
        return 'winner';
    }

    // On ajoute les GRADED_INDIVIDUAL_RETAIN_COUNT premiers individus à la liste des parents
    var parents = [];
    for (var i = 0; i < GRADED_INDIVIDUAL_RETAIN_COUNT; i++) {
        parents.push(gradedPopulation[i]);
    }
    // On ajoute quelques chanceux
    for (var i = GRADED_INDIVIDUAL_RETAIN_COUNT; i < gradedPopulation.length; i++) {
        if (random() < CHANCE_RETAIN_NONGRATED) {
            parents.push(gradedPopulation[i]);
        }
    }

    // mutation de quelques individus
    for (var i = 0; i < parents.length; i++) {
        if (random() < CHANCE_TO_MUTATE) {
            parents[i].mutate(floor(random(MAX_MUTATION)));
        }
    }

    // crossover
    var desiredLength = POPULATION_COUNT - parents.length;
    var childrens = [];
    while (childrens.length < desiredLength) {
        var father = parents[floor(random(parents.length))];
        var mother = parents[floor(random(parents.length))];
        if (father != mother) { // father != mother
            var child = new Individual();
            child.crossover(father, mother);
            childrens.push(child);
        }
    }
    for (var i = 0; i < childrens.length; i ++) {
        parents.push(childrens[i]);
    }

    this.individuals = parents;
}

Population.prototype.sort = function() 
{
    var sortedIndividuals = [];
    for (var i = 0; i < this.individuals.length; i++) {
        sortedIndividuals.push({
            fitness: this.individuals[i].fitness(),
            individual: this.individuals[i],
        })
    }

    sortedIndividuals.sort(function(a, b) {
        return b.fitness - a.fitness;
    });

    return sortedIndividuals;
}

Population.prototype.getAverageFitness = function()
{
    var total = 0;
    for (var i = 0; i < this.individuals.length; i++) {
        total += this.individuals[i].fitness();
    }

    return total / this.individuals.length;
}

Population.prototype.getFittest = function()
{
    var max = 0;
    for (var i = 0; i < this.individuals.length; i++) {
        max = Math.max(max, this.individuals[i].fitness());
    }

    return max;
}

Population.prototype.setWinners = function(solutions)
{
    for(var i = 0; i < solutions; i++) {
        solutions[i].winner = true;
    }
}

Population.prototype.draw = function()
{
    var colSize = width / (4 * RADIUS_RANGE);
    var rowSize = POPULATION_COUNT / colSize;
    var d = RADIUS_RANGE * 4;
    for (var j = 0; j < rowSize; j++) {
        for (var i = 0; i < colSize; i++) {
            var index = i + j * colSize;
            this.individuals[index].draw(createVector(2 * RADIUS_RANGE + i * 4 * RADIUS_RANGE, 2 * RADIUS_RANGE + j * 4 * RADIUS_RANGE));
        }
    }
}

