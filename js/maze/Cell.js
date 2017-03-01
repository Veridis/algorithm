const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;

Cell = function(i, j, size) 
{
	this.i = i; // column
	this.j = j; // row
	this.size = size;
	this.visited = false;
	this.walls = [true, true, true, true];
}

Cell.prototype.show = function()
{
	var w = this.size;
	var x = this.i * w;
	var y = this.j * w;
	stroke(255);
	strokeWeight(2);
	if (this.walls[TOP]) {
		line(x	,   y	,   x+w	, 	y);
	}
	if (this.walls[RIGHT]) {
		line(x+w, 	y	,   x+w	, 	y+w);
	}
	if (this.walls[BOTTOM]) {
		line(x+w, 	y+w	, 	x	, 	y+w);
	}
	if (this.walls[LEFT]) {
		line(x	,   y+w	, 	x	,   y);
	}
	
	if (this.visited) {
		noStroke();
		fill(255, 0, 255, 50)
		rect(x, y, this.size, this.size);
	}	

	// objectif highlight
	fill(0, 255, 0, 50);
	rect((COLS-1) * w, (ROWS-1) * w, this.size, this.size);
}

Cell.prototype.highlight = function()
{
	// highlight current
	var x = this.i * this.size;
	var y = this.j * this.size;
	noStroke();
	fill(50, 50, 150)
	ellipse(x+this.size/2, y+this.size/2, this.size-2, this.size-2);
}

Cell.prototype.checkNeighbours = function(grid) 
{
	var neighbors = [];

	var top = grid[Maze.index(this.i, 		this.j-1)];
	var right = grid[Maze.index(this.i+1, 	this.j)];
	var bottom = grid[Maze.index(this.i, 	this.j+1)];
	var left = grid[Maze.index(this.i-1, 	this.j)];

	if (top && !top.visited) {
		neighbors.push(top);
	}
	if (right && !right.visited) {
		neighbors.push(right);
	}
	if (bottom && !bottom.visited) {
		neighbors.push(bottom);
	}
	if (left && !left.visited) {
		neighbors.push(left);
	}

	if (neighbors.length > 0) {
		var r = floor(random(0, neighbors.length));
		return neighbors[r];
	}

	return undefined;
}

