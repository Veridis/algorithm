NegativeFilter = function(filter)
{
    this.input = [];    // Array of pixels [y][x]
    this.filter = filter;
    this.output = [];   // Array of pixels [y][x]
}

NegativeFilter.prototype = 
{
    applyFilter : function(input) {
        this.input = (this.filter) ? this.filter.applyFilter(input) : input;
        
        for (var y = 0; y < CAM_HEIGHT; y++) {
            var yarray = [];
            for(var x = 0; x < CAM_WIDTH; x++) {
                var i = (x + y * CAM_WIDTH) * 4;
                var r = 255 - this.input[y][x].r;
                var g = 255 - this.input[y][x].g;
                var b = 255 - this.input[y][x].b;
                yarray[x] = {
                    r: r,
                    g: g,
                    b: b,
                    a: this.input[y][x].a
                }
            }
            this.output[y] = yarray;
        }

        return this.output;
    }
}