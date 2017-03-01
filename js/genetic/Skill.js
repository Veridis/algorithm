function Skill()
{
	this.solution = [];//new Array(DEFAULT_GENE_LENGTH);
}

Skill.prototype.setSolution = function(genesAsString)
{
	for (var i = 0; i < genesAsString.length; i++) {
		var c = genesAsString[i];
		if ('0' === c || '1' === c) {
			this.solution.push(parseInt(c));
		} else {
			this.solution.push(0);
		}
	}
}

Skill.prototype.getSkill = function(individual)
{
	var skill = 0;
	for (var i = 0; i < individual.genes.length && i < this.solution.length; i++) {
		if (individual.genes[i] === this.solution[i]) {
			skill++;
		}
	}

	return skill;
}

Skill.prototype.getMaxSkill = function()
{
	return this.solution.length;
}