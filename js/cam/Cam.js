const R = 0;
const G = 1;
const B = 2;
const A = 3;

Cam = function(video)
{
    this.input = [];
    this.filter;
    this.output = []; // Array of pixels [y][x]
}

Cam.prototype = 
{
    /**
     * Apply the filter, filter object must have an "applyFilter" method
     */
    applyFilter : function(filter) {
        this.loadInput(video);
        this.filter = filter || new NeutralFilter();
        this.output = this.filter.applyFilter(this.input);
    },

    /**
     * Display the filtered input
     */
    display : function() {

        loadPixels();
        for (var y = 0; y < CAM_HEIGHT; y++) {
            for(var x = 0; x < CAM_WIDTH; x++) {
                var i = (x + y * CAM_WIDTH) * 4;
                pixels[i + R] = this.output[y][x].r;
                pixels[i + G] = this.output[y][x].g;
                pixels[i + B] = this.output[y][x].b;
                pixels[i + A] = this.output[y][x].a;
            }
        }
        updatePixels();
    },

    loadInput : function(video) {
        video.loadPixels();
        for (var y = 0; y < CAM_HEIGHT; y++) {
            var yarray = [];
            for(var x = 0; x < CAM_WIDTH; x++) {
                var i = (x + y * CAM_WIDTH) * 4;
                yarray[x] = {
                    r: video.pixels[i + R],
                    g: video.pixels[i + G],
                    b: video.pixels[i + B],
                    a: video.pixels[i + A]
                }
            }
            this.input[y] = yarray;
        }
        video.updatePixels();
    }
}