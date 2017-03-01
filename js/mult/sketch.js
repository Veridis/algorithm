//const DEFAULT_TABLE = 533;
//const DEFAULT_MODULO = 400;

const DEFAULT_TABLE = 2;
const DEFAULT_MODULO = 10;

var paused = false;

// global variables
var rose;

// DOM
var film;
var colorise;
var tableSlider;
var moduloSlider;


function setup()
{
	createCanvas(600, 600);
	angleMode(RADIANS);
	colorMode(RGB);
	background(51);

	rose = new Rose(DEFAULT_TABLE, DEFAULT_MODULO)

	createDom();
	
}

function draw() 
{
	background(51);

	if (paused) {
		printPause();
	}


	!film.checked() 
		? rose.update(tableSlider.value(), moduloSlider.value()) 
		: rose.film()
	;
	rose.show();
}

function keyTyped()
{
	if ('p' === key) {
		paused = !paused;
		paused ? noLoop() : loop();
	} else if ('n' === key && paused) {
		redraw();
	}
}

function printPause()
{
	console.log('pause');
	textAlign(LEFT);
	fill(71, 141, 255);
	text('PAUSE', 20, 20);
}

function createDom()
{
	film = createCheckbox('Film', false);
	film.position(0, 610);

	colorise = createCheckbox('Couleur', false);
	colorise.position(50, 610);

	var t = createP('Table');
	t.position(20, 630); t.style('margin', '0');
	tableSlider = createSlider(2, 1000, DEFAULT_TABLE, 1);
	tableSlider.style('width', '500px');
	tableSlider.position(100, 630);

	var t = createP('Modulo');
	t.position(20, 660); t.style('margin', '0');
	moduloSlider = createSlider(10, 400, DEFAULT_MODULO, 1);
	moduloSlider.style('width', '500px');
	moduloSlider.position(100, 660);
}