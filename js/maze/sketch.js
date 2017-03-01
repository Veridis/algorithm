var maze;

var COLS, ROWS;

var LVL1_SIZE = 80;
var lvl = 1;

function setup() {
	createCanvas(400,400);
	maze = new Maze(LVL1_SIZE / lvl);
	maze.initialize();
}

function draw() {
	background(51);
	for (var i = 0; i < maze.grid.length; i++) {
		maze.grid[i].show();
	}

	maze.current.highlight();

	if (!maze.isGenerationDone()) {
		maze.generate();
	}

	checkWin();
}

function keyPressed()
{
	if (maze.done) {
		maze.handleKeyPressed(keyCode);
	}
}

checkWin = function()
{
	if (maze.done) {
		if (maze.current.i === COLS -1 && maze.current.j === ROWS - 1) {
			lvl ++;
			maze = new Maze(LVL1_SIZE / lvl);
			maze.initialize();
		}
	}
}





