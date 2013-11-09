var omni = require('omni');
var Maps = require('./src/collections/Maps');

var ChatMessages = omni.Collection.extend({
    createPermission: function(connection) {
        return true; // Allow all users to create new chat message models (actual messages)
    }
});

var requestMapSvgEvent = {
    run: function (connection, collections, data) {
        var result = collections.maps.findWhere({name: data.name})._svg;
        return {
            result: result,
            error: result ? null : 'The requested map was not found.'
        };
    }
}

omni.listen(1337, {
    messages: new ChatMessages(),
    maps: Maps.instance
}, {
    requestMapSvgEvent: requestMapSvgEvent
});

console.log('Server running at http://127.0.0.1:1337/');