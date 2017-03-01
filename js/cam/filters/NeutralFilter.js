NeutralFilter = function(filter)
{
    this.input = [];    // Array of pixels [y][x]
    this.filter = filter;
    this.output = [];   // Array of pixels [y][x]
}

NeutralFilter.prototype = 
{
    applyFilter : function(input) {
        this.input = (this.filter) ? this.filter.applyFilter(input) : input;

        for (var y = 0; y < CAM_HEIGHT; y++) {
            var yarray = [];
            for(var x = 0; x < CAM_WIDTH; x++) {
                var i = (x + y * CAM_WIDTH) * 4;
                yarray[x] = {
                    r: this.input[y][x].r,
                    g: this.input[y][x].g,
                    b: this.input[y][x].b,
                    a: this.input[y][x].a
                }
            }
            this.output[y] = yarray;
        }

        return this.output;
    }
}