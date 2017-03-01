LowPassFilter = function(filter)
{
    this.input = [];    // Array of pixels [y][x]
    this.filter = filter;
    this.output = [];   // Array of pixels [y][x]
}

LowPassFilter.prototype = 
{
    applyFilter : function(input) {
        this.input = (this.filter) ? this.filter.applyFilter(input) : input;

        var kernel = this.getKernel();
        for (var y = 0; y < CAM_HEIGHT; y++) {
            var yarray = [];
            for(var x = 0; x < CAM_WIDTH; x++) {
                var i = (x + y * CAM_WIDTH) * 4;
                if ((x > 0 && x < CAM_WIDTH - 1) && (y > 0 && y < CAM_HEIGHT - 1)) {
                    var a = [
                        this.input[y+1][x-1], this.input[y+1][x], this.input[y+1][x+1],
                        this.input[y][x-1],   this.input[y][x],   this.input[y][x+1],
                        this.input[y-1][x-1], this.input[y-1][x], this.input[y-1][x+1],
                    ];
                    var pr = (kernel[0] * a[0].r + kernel[1] * a[1].r + kernel[2] * a[2].r) 
                            +(kernel[3] * a[3].r + kernel[4] * a[4].r + kernel[5] * a[5].r)
                            +(kernel[6] * a[6].r + kernel[7] * a[7].r + kernel[8] * a[8].r)
                    ;
                    pr = pr / 9;
                    var pg = (kernel[0] * a[0].g + kernel[1] * a[1].g + kernel[2] * a[2].g) 
                            +(kernel[3] * a[3].g + kernel[4] * a[4].g + kernel[5] * a[5].g)
                            +(kernel[6] * a[6].g + kernel[7] * a[7].g + kernel[8] * a[8].g)
                    ;
                    pg = pg / 9;
                    var pb = (kernel[0] * a[0].b + kernel[1] * a[1].b + kernel[2] * a[2].b) 
                            +(kernel[3] * a[3].b + kernel[4] * a[4].b + kernel[5] * a[5].b)
                            +(kernel[6] * a[6].b + kernel[7] * a[7].b + kernel[8] * a[8].b)
                    ;
                    pb = pb / 9;
                    yarray[x] = {
                        r: pr,
                        g: pg,
                        b: pb,
                        a: this.input[y][x].a
                    }
                } else {
                    yarray[x] = {
                        r: 51,
                        g: 51,
                        b: 51,
                        a: this.input[y][x].a
                    };
                }
            }
            this.output[y] = yarray;
        }

        return this.output;
    },

    getKernel : function() {
        return [
            1, 1, 1,
            1, 4, 1,
            1, 1, 1
        ];
    }
}