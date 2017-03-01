ColorFilter = function(rgb, filter)
{
    this.input = [];    // Array of pixels [y][x]
    this.filter = filter;
    this.output = [];   // Array of pixels [y][x]
    this.rgb = rgb;		// Array of 3 values : R, G, B
}

ColorFilter.prototype = 
{
    applyFilter : function(input) {
        this.input = (this.filter) ? this.filter.applyFilter(input) : input;
        
        for (var y = 0; y < CAM_HEIGHT; y++) {
            var yarray = [];
            for(var x = 0; x < CAM_WIDTH; x++) {
                var i = (x + y * CAM_WIDTH) * 4;
                var grey = (this.input[y][x].r + this.input[y][x].g + this.input[y][x].b) / 3;
                yarray[x] = {
                    r: this.input[y][x].r + this.rgb[R],
                    g: this.input[y][x].g + this.rgb[G],
                    b: this.input[y][x].b + this.rgb[B],
                    a: this.input[y][x].a
                }
            }
            this.output[y] = yarray;
        }

        return this.output;
    }
}