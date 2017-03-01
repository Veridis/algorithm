MedianFilter = function(filter)
{
    this.input = [];    // Array of pixels [y][x]
    this.filter = filter;
    this.output = [];   // Array of pixels [y][x]
}

MedianFilter.prototype = 
{
    applyFilter : function(input) {
        this.input = (this.filter) ? this.filter.applyFilter(input) : input;

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
                    var medians = this.findMedian(a);
                    yarray[x] = {
                        r: medians[R],
                        g: medians[G],
                        b: medians[B],
                        a: this.input[y][x].a
                    }
                } else {
                    yarray[x] = {
                        r: 51,
                        g: 51,
                        b: 51,
                        a: 0,
                    };
                }
            }
            this.output[y] = yarray;
        }

        return this.output;
    },

    findMedian : function(a) {
        var medianR = this.median([
            a[0].r, a[1].r, a[2].r, a[3].r, a[4].r, a[5].r, a[6].r, a[7].r, a[8].r, 
        ]);
        var medianG = this.median([
            a[0].g, a[1].g, a[2].g, a[3].g, a[4].g, a[5].g, a[6].g, a[7].g, a[8].g, 
        ]);
        var medianB = this.median([
            a[0].b, a[1].b, a[2].b, a[3].b, a[4].b, a[5].b, a[6].b, a[7].b, a[8].b, 
        ]);

        return [medianR, medianG, medianB];
    },

    median : function(values) {
        values.sort(function(a,b) { 
            return a - b;
        });
        var lowMiddle = Math.floor((values.length - 1) / 2);
        var highMiddle = Math.ceil((values.length - 1) / 2);

        return (values[lowMiddle] + values[highMiddle]) / 2;
    }
}