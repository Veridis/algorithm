//constantes
const GRAVITY = 0.2;
const FREQ_MULTIPLICATOR = 1.5;		// Multiplicateur d'apparition des feux d'artifices (toujours en fonction du centroid et de l'amplitude de la musique)


// global variables
var paused = false;

var fireworks = [];					// Array de fireworks à afficher
var gravity;						// vector 2D (0, GRAVITY)
var musicCentroid;					// centroid de la musique à l'instant t 	[0, 1]
var musicAmplitude;					// amplitude de la musique à l'instant t 	[0, 1]

function preload() 
{
	//music = loadSound('data/Song_of_Durin.mp3');
	music = loadSound('data/starship_loopers.mp3');
}

function setup()
{
	createCanvas(1200, 600);

	// Music
	music.play();
	amplitude = new p5.Amplitude();
	fft = new p5.FFT();

	// Environment
	gravity = createVector(0, GRAVITY);
	colorMode(HSB, 255, 255, 255, 255);
	stroke(255);
	strokeWeight(4);
	background(0);
}

function mouseClicked()
{
	paused = !paused;
	if (paused) {
		music.pause();
		noLoop();
	} else {
		loop();
		music.play();
	}
	
}

function draw() 
{
	var spectrum = fft.analyze();
	var centroid = fft.getCentroid();
	musicCentroid = map(centroid, 0, 20000, 0, 1)
	musicAmplitude = map(amplitude.getLevel(), 0, 1, 0, 1)
	background(0, 25);
	if (random(1) < musicCentroid * musicAmplitude * FREQ_MULTIPLICATOR) {
		fireworks.push(new Firework());
	}
	for(var i = fireworks.length-1; i >= 0; i--) {
		fireworks[i].update();
		fireworks[i].show();
		if (fireworks[i].done()) { 		// On suprime le firework quand toutes les child sont effacées
			fireworks.splice(i, 1);
		}
	}
}
