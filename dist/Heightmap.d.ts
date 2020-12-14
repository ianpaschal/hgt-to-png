/**
 * This class takes a .hgt file as input and serves as an abstract height map
 * which can be used to
 */
declare class Heightmap {
    _resolution: number;
    _size: number;
    _max: number;
    _min: number;
    _position: {
        lat: number;
        lon: number;
    };
    _elevations: number[];
    _name: string;
    constructor(filepath: any);
    getElevation(x: any, y: any): void;
    savePNG(inMin: number, inMax: number, outMin: number, outMax: number): void;
}
export default Heightmap;
