import fs from 'fs';
import { PNG } from 'pngjs';
import path from 'path';

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
	_name: string;

	constructor( filepath ) {

		console.log(`Loading ${path.parse(filepath).name}`)
		const data = fs.openSync(filepath, 'r');
		const stats = fs.fstatSync(data);

		this._name = path.parse(filepath).name;

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

		this._elevations = [];

		const buffer = fs.readFileSync(data);

		// Elevations are 2-byte big-endian ints, so advance through the file by 2
		for (var i = 0; i < buffer.length; i+=2) {
			var elevation = buffer.readInt16BE(i);
			// no data:
			if (elevation === -32768) {
				elevation = null;
			}
			this._elevations.push(elevation)
			if (elevation) {
				if (!this._max || elevation > this._max ) {
					this._max = elevation;
				}
				if (!this._min || elevation < this._min) {
					this._min = elevation;
				}
			}
		}
		console.log(`Imported! Max elevation is ${this._max} m, min elevation is ${this._min} m.`)
	}

	getElevation(x,y) {

		// If no y coordinate, x must be a lat-lon object, or
	}

	savePNG( inMin: number, inMax: number, outMin: number, outMax: number ) {
		const image = new PNG({
			width: this._size,
			height: this._size,
			filterType: -1,
		});

		const inputRange = inMax - inMin;
		const outputRange = outMax - outMin;

		this._elevations.forEach((elevation, i)=>{
			const idx = i*4;

			if (!elevation) {
				image.data[idx  ] = 0;
				image.data[idx+1] = 0;
				image.data[idx+2] = 0;
				image.data[idx+3] = 0;
			} else {

				// if the input range is narrower than the height map, we clip extremely high and low values to the range;
				const inputBounded = Math.min(Math.max(elevation, inMin), inMax);

				// Convert to a percent of the range:
				const inputValue = inputBounded/inputRange;

				const outputValue = inputValue * outputRange + outMin;

				image.data[idx  ] = outputValue;
				image.data[idx+1] = outputValue;
				image.data[idx+2] = outputValue;
				image.data[idx+3] = 255;
			}
		});
		image.pack().pipe(fs.createWriteStream(`./output/${this._name}.png`));
	}
}

export default Heightmap;
