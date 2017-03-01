SobelFilter = function(filter)
{
    this.input = [];    // Array of pixels [y][x]
    this.filter = filter;
    this.output = [];   // Array of pixels [y][x]
}

SobelFilter.prototype = 
{
    applyFilter : function(input) {
        this.input = (this.filter) ? this.filter.applyFilter(input) : input;
        
        var kernelx = this.getKernelX();
        var kernely = this.getKernelY();
        for (var y = 0; y < CAM_HEIGHT; y++) {
            var yarray = [];
            for(var x = 0; x < CAM_WIDTH; x++) {
                if ((x > 0 && x < CAM_WIDTH - 1) && (y > 0 && y < CAM_HEIGHT - 1)) {
                    var i = (x + y * CAM_WIDTH) * 4;
                    var a = [
                        this.input[y+1][x-1].r, this.input[y+1][x].r, this.input[y+1][x+1].r,
                        this.input[y][x-1].r,   this.input[y][x].r,   this.input[y][x+1].r,
                        this.input[y-1][x-1].r, this.input[y-1][x].r, this.input[y-1][x+1].r,
                    ]
                    var gx = (kernelx[0] * a[0] + kernelx[1] * a[1] + kernelx[2] * a[2]) 
                            +(kernelx[3] * a[3] + kernelx[4] * a[4] + kernelx[5] * a[5])
                            +(kernelx[6] * a[6] + kernelx[7] * a[7] + kernelx[8] * a[8])
                    ;
                    var gy = (kernely[0] * a[0] + kernely[1] * a[1] + kernely[2] * a[2]) 
                            +(kernely[3] * a[3] + kernely[4] * a[4] + kernely[5] * a[5])
                            +(kernely[6] * a[6] + kernely[7] * a[7] + kernely[8] * a[8])
                    ;
                    var g = sqrt(pow(gx, 2), pow(gy, 2));
                    yarray[x] = {
                        r: g,
                        g: g,
                        b: g,
                        a: this.input[y][x].a
                    };
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

    getKernelX : function() {
        return [
            -1, 0, 1,
            -2, 0, 2,
            -1, 0, 1
        ];
    },

    getKernelY : function() {
        return [
            -1, -2, -1,
             0,  0,  0, 
             1,  2,  1
        ];
    }
}