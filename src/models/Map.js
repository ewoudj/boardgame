var omni = require("omni");

module.exports = omni.Model.extend({
    defaults: {
        name: 'Unnamed map',
        numberOfRegions: 0,
        maximumNumberOfPlayers: 0,
        filename: null,
        _svg: null
    },

    readPermission: function (connection, property) {
        // Essentially this makes all properties with a name starting with an underscore
        // server only.
        return true; // !(property != null && property.indexOf('_') == 0);
    },

    writePermission: function (connection, property, value) {
        return true;
    }
});
