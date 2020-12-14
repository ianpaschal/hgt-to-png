"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var pngjs_1 = require("pngjs");
var path_1 = tslib_1.__importDefault(require("path"));
/**
 * This class takes a .hgt file as input and serves as an abstract height map
 * which can be used to
 */
var Heightmap = /** @class */ (function () {
    function Heightmap(filepath) {
        console.log("Loading " + path_1.default.parse(filepath).name);
        var data = fs_1.default.openSync(filepath, 'r');
        var stats = fs_1.default.fstatSync(data);
        this._name = path_1.default.parse(filepath).name;
        /**
         * Elevations are 2-byte integers. Divide the size by 2 to get the number of
         * elevations within the file, and square root to calculate side length.
         */
        this._size = Math.sqrt(stats.size / 2);
        switch (this._size) {
            case 3601:
                this._resolution = 1;
                break;
            case 1201:
                this._resolution = 3;
                break;
            default:
                throw new Error("Could not determine .HGT resolution!");
        }
        this._elevations = [];
        var buffer = fs_1.default.readFileSync(data);
        // Elevations are 2-byte big-endian ints, so advance through the file by 2
        for (var i = 0; i < buffer.length; i += 2) {
            var elevation = buffer.readInt16BE(i);
            // no data:
            if (elevation === -32768) {
                elevation = null;
            }
            this._elevations.push(elevation);
            if (elevation) {
                if (!this._max || elevation > this._max) {
                    this._max = elevation;
                }
                if (!this._min || elevation < this._min) {
                    this._min = elevation;
                }
            }
        }
        console.log("Imported! Max elevation is " + this._max + " m, min elevation is " + this._min + " m.");
    }
    Heightmap.prototype.getElevation = function (x, y) {
        // If no y coordinate, x must be a lat-lon object, or
    };
    Heightmap.prototype.savePNG = function (inMin, inMax, outMin, outMax) {
        var image = new pngjs_1.PNG({
            width: this._size,
            height: this._size,
            filterType: -1,
        });
        var inputRange = inMax - inMin;
        var outputRange = outMax - outMin;
        this._elevations.forEach(function (elevation, i) {
            var idx = i * 4;
            if (!elevation) {
                image.data[idx] = 0;
                image.data[idx + 1] = 0;
                image.data[idx + 2] = 0;
                image.data[idx + 3] = 0;
            }
            else {
                // if the input range is narrower than the height map, we clip extremely high and low values to the range;
                var inputBounded = Math.min(Math.max(elevation, inMin), inMax);
                // Convert to a percent of the range:
                var inputValue = inputBounded / inputRange;
                var outputValue = inputValue * outputRange + outMin;
                image.data[idx] = outputValue;
                image.data[idx + 1] = outputValue;
                image.data[idx + 2] = outputValue;
                image.data[idx + 3] = 255;
            }
        });
        image.pack().pipe(fs_1.default.createWriteStream("./output/" + this._name + ".png"));
    };
    return Heightmap;
}());
exports.default = Heightmap;
//# sourceMappingURL=Heightmap.js.map