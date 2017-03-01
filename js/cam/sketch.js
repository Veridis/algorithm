const CAM_WIDTH = 400;
const CAM_HEIGHT = 300;

var canvas;     // html5 canvas
var input;      // input video stream
var cam;        // cam object

function setup() {
    canvas = createCanvas(CAM_WIDTH, CAM_HEIGHT);
    canvas.id('cam');
    background(0);
    pixelDensity(1);

    // capture the video of the size of the canvas, and hide it
    video = createCapture(VIDEO);
    video.size(CAM_WIDTH, CAM_HEIGHT);
    video.hide();
    cam = new Cam(video);
}

function draw() {
    background(0);
    cam.applyFilter();
    //cam.applyFilter(new GreyScaleFilter());
    //cam.applyFilter(new ColorFilter([0, 0, 100]));
    //cam.applyFilter(new ThresholdFilter());
    //cam.applyFilter(new SobelFilter());
    //cam.applyFilter(new LowPassFilter());
    //cam.applyFilter(new MedianFilter());
    //cam.applyFilter(new NegativeFilter());
    //cam.applyFilter(new LowPassFilter(new ThresholdFilter(150, new NegativeFilter(new SobelFilter()))));
    cam.display();
}
