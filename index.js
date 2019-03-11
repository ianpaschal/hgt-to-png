var fs = require('fs');

var path = "./N44E005.hgt";

var fd = fs.openSync(path, 'r');
var stat = fs.fstatSync(fd);

if (stat.size === 12967201 * 2) {
	this._resolution = 1;
	this._size = 3601;
} else if (stat.size === 1442401 * 2) {
	this._resolution = 3;
	this._size = 1201;
} else {
	throw new Error('Unknown tile format (1 arcsecond and 3 arcsecond supported).');
}

this._buffer = fs.readFileSync(fd);

let max, min;

for (var i = 0; i < this._buffer.length; i+=2) {

	var elevation = this._buffer.readInt16BE(i);
	if (!max || elevation > max ) {
		max = elevation;
	}
	if (!min || elevation < min) {
		min = elevation;
	}
}

console.log("Max:", max, "Min:", min)
