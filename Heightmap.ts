import fs from 'fs';

/**
 * This class takes a .hgt file as input and serves as an abstract height map
 * which can be used to 
 */
class Heightmap {

	_resolution: number; // In arc-seconds
	_size: number;
	_max: number;
	_min: number;
	_position: {
		lat: number;
		lon: number;
	}
	_elevations: number[];

	constructor( path ) {
		const data = fs.openSync(path, 'r');
		const stats = fs.fstatSync(data);

		/**
		 * Elevations are 2-byte integers. Divide the size by 2 to get the number of
		 * elevations within the file, and square root to calculate side length.
		 */
		this._size = Math.sqrt(stats.size / 2);

		switch(this._size) {
			case 3601:
				this._resolution = 1;
				break;
			case 1201:
				this._resolution = 3;
				break;
			default:
				throw new Error("Could not determine .HGT resolution!");
		}

		const buffer = fs.readFileSync(data);

		// Elevations are 2-byte big-endian ints, so advance through the file by 2
		for (var i = 0; i < buffer.length; i+=2) {
			var elevation = buffer.readInt16BE(i);
			this._elevations.push(elevation)
			if (!this._max || elevation > this._max ) {
				this._max = elevation;
			}
			if (!this._min || elevation < this._min) {
				this._min = elevation;
			}
		}
	}

	getElevation(x,y) {

		// If no y coordinate, x must be a lat-lon object, or 
	}
}

export default Heightmap;