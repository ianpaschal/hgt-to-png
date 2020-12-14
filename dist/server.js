"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var Heightmap_1 = tslib_1.__importDefault(require("./Heightmap"));
var directoryPath = path_1.default.join(__dirname, '../data');
//passsing directoryPath and callback function
var fileNames = fs_1.default.readdirSync(directoryPath);
fileNames.forEach(function (fileName, i) {
    if (path_1.default.extname(fileName).toLowerCase() == '.hgt') {
        var map = new Heightmap_1.default(directoryPath + "/" + fileName);
        map.savePNG(0, 5120, 16, 255);
    }
});
//# sourceMappingURL=server.js.map