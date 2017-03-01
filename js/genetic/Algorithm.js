const UNIFORM_RATE = 0.5;
const MUTATION_RATE = 0.00015;
const TOURNAMENT_SIZE = 5;
const ELITISME = true;

function Algorithm()
{
	var i;
}

Algorithm.prototype.evolvePopulation = function(pop)
{
	var newPopulation = new Population(pop.individuals.length, false);
	console.log(newPopulation);
	// Keep our best individual
	if (ELITISME) {
		newPopulation.individuals[0] = pop.getMoreCompetent();
	}

	// CrossOver population
	var elitismeOffset;
	if (ELITISME) {
		elitismeOffset = 1;
	} else {
		elitismeOffset = 0;
	}

	// Loop over population size and create new indivuals with crossover
	for (var i = elitismeOffset; i < pop.length; i++) {
		var indiv1 = new this.tournamentSelection(pop);
		var indiv2 = new this.tournamentSelection(pop);
		var newIndiv = this.crossover(indiv1, indiv2);
		newPopulation.individuals[i] = newIndiv;
	}

	// mutate population
	for (var i = elitismeOffset; i < newPopulation.length; i++) {
		this.mutate(newPopulation.individuals[i]);
	}

	return newPopulation;
}

Algorithm.prototype.crossover = function(indiv1, indiv2)
{
	var newSol = new Individual();
	// Loop through genes
	for (var i = 0; i < newSol.genes.length; i++) {
		// crossover
		if (random(1) <= UNIFORM_RATE) {
			newSol.genes[i] = indiv1.genes[i];
		} else {
			newSol.genes[i] = indiv2.genes[i];
		}
	}

	return newSol;
}

Algorithm.prototype.mutate = function(indiv)
{
	// Loop through genes
	for (var i = 0; i < indiv.genes.length; i++) {
		if (random(1) <= MUTATION_RATE) {
			// Create random gene;
			indiv.genes[i] = round(random(1));
		}
	}
}

Algorithm.prototype.tournamentSelection = function(pop)
{
	// Create a tournament pop
	var tournament = new Population(TOURNAMENT_SIZE, false);
	// For each place in the tournament get a random individual
    for (var i = 0; i < TOURNAMENT_SIZE; i++) {
        var randomId = floor(random(pop.length));
        tournament.indivudals[i] = pop.individuals[randomId];
    }

    // Get the fittest
    var fittest = tournament.getMoreCompetent();

    return fittest;
}










