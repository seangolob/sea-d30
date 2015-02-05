'use strict';

var fs = require('fs');
var bitmap = fs.readFileSync('test.bmp');

var bitmapObject = {};

bitmapObject.type = bitmap.toString('utf-8', 0, 2);
bitmapObject.size = bitmap.readInt32LE(2);
bitmapObject.startOfPixels = bitmap.readInt32LE(10);
bitmapObject.width = bitmap.readInt32LE(18);
bitmapObject.height = bitmap.readInt32LE(22);
bitmapObject.colorDepth = bitmap.readInt16LE(28);
bitmapObject.paletteSize = bitmap.readInt32LE(46);

console.dir(bitmapObject);

