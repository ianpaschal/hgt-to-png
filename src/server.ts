import path from 'path';
import fs from 'fs';

import Heightmap from "./Heightmap";





const directoryPath = path.join(__dirname, '../data');
//passsing directoryPath and callback function
const fileNames = fs.readdirSync(directoryPath);

fileNames.forEach((fileName, i) => {
	if (path.extname(fileName).toLowerCase() == '.hgt') {
		const map = new Heightmap(`${directoryPath}/${fileName}`);
		map.savePNG(0, 5120, 16, 255);
	}
});
