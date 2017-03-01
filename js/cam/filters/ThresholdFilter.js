ThresholdFilter = function(threshold, filter)
{
    this.input = [];   // Array of pixels [y][x]
    this.filter = filter;
    this.output = [];   // Array of pixels [y][x]
    this.threshold = threshold || 120;
}

ThresholdFilter.prototype = 
{
    applyFilter : function(input) {
        this.input = (this.filter)? this.filter.applyFilter(input) : input;

        for (var y = 0; y < CAM_HEIGHT; y++) {
            var yarray = [];
            for(var x = 0; x < CAM_WIDTH; x++) {
                var i = (x + y * CAM_WIDTH) * 4;
                var grey = (this.input[y][x].r + this.input[y][x].g + this.input[y][x].b) / 3;
                var t = (grey >= this.threshold) ? 255 : 0; 
                yarray[x] = {
                    r: t,
                    g: t,
                    b: t,
                    a: this.input[y][x].a
                }
            }
            this.output[y] = yarray;
        }

        return this.output;
    }
}