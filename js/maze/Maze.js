const CELL_SIZE = 40;

Maze = function(cell_size)
{
	this.cellSize = cell_size || CELL_SIZE;
	this.current;
	this.grid = [];
	this.stack = [];
	this.done = false;
}

Maze.index = function(i, j)
{
	if (i < 0 || j < 0 || i > COLS - 1 || j > ROWS - 1) {
		return -1;
	}

	return i + j * COLS;
}

Maze.prototype.initialize = function()
{
	COLS = width / maze.cellSize;
	ROWS = height / maze.cellSize;
	
	for (var j = 0; j < ROWS; j++) {
		for (var i = 0; i < COLS; i++) {
			var cell = new Cell(i, j, this.cellSize);
			this.grid.push(cell);
		}
	}
	this.current = this.grid[0];
}

Maze.prototype.generate = function()
{
	this.current.visited = true;
	var next = this.current.checkNeighbours(this.grid);
	if (undefined !== next) {
		next.visited = true;
		this.stack.push(this.current);
		this.removeWalls(this.current, next);
		this.current = next;
	} else if (this.stack.length > 0) {
		this.current = this.stack.pop();
	}
}

Maze.prototype.removeWalls = function(a, b) 
{
	var x = a.i - b.i;
	if (x === 1) {
		// Moving left
		a.walls[LEFT] = false;
		b.walls[RIGHT] = false;
	} else if (x === -1) {
		// Moving right
		a.walls[RIGHT] = false;
		b.walls[LEFT] = false;
	}

	var y = a.j - b.j;
	if (y === 1) {
		// Moving top
		a.walls[TOP] = false;
		b.walls[BOTTOM] = false;
	} else if (y === -1) {
		// Moving down
		a.walls[BOTTOM] = false;
		b.walls[TOP] = false;
	}
}

Maze.prototype.isGenerationDone = function() 
{
	if (!this.done) {
		for(i = 0; i < this.grid.length; i++) {
			if (!this.grid[i].visited) {
				return false;
			}
		}
		
		if (this.stack.length === 0) {
			this.done = true;
		}

		return false;
	}

	this.done = true;
}

Maze.prototype.handleKeyPressed = function(keyCode)
{
	x = this.current.i;
	y = this.current.j;
	if (UP_ARROW === keyCode) {
		if (!this.current.walls[TOP]) {
			next = this.grid[Maze.index(x, y-1)];
			this.current = next;
		}
	} else if (RIGHT_ARROW === keyCode) {
		if (!this.current.walls[RIGHT]) {
			next = this.grid[Maze.index(x+1, y)];
			this.current = next;
		}
	} else if (DOWN_ARROW === keyCode) {
		if (!this.current.walls[BOTTOM]) {
			next = this.grid[Maze.index(x, y+1)];
			this.current = next;
		}
	} else if (LEFT_ARROW === keyCode) {
		if (!this.current.walls[LEFT]) {
			next = this.grid[Maze.index(x-1, y)];
			this.current = next;
		}
	}
}
