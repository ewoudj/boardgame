var fs = require('fs');
var omni = require('omni');
var Map = require('../models/Map');

var mapPath = './maps/';

// Maps Collection
var Maps = omni.Collection.extend({
    model: Map
});

// Create the default instance
// Get the map files from the file system, as this is during startup it can run sync
var mapFilenames = fs.readdirSync(mapPath);
var mapEntities = [];

// Instantiate the map models
for(var i = 0, l = mapFilenames.length; i < l; i++){
    var mapFilename = mapFilenames[i];
    //var fileContent = fs.readFileSync(mapPath + mapFilename); // Sync read the svg file
    var name = mapFilename.substring(0, mapFilename.length - 4);
    mapEntities.push(new Map({
        name: name,
        filename: mapFilename,
        _svg: null // fileContent
    }));
}

Maps.instance = new Maps(mapEntities);

module.exports = Maps;
