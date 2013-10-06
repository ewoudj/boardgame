var omni = require("omni");

var ChatMessages = omni.Collection.extend({
    createPermission: function(connection) {
        return true; // Allow all users to create new chat message models (actual messages)
    }
});

omni.listen(1337, {messages: new ChatMessages()});

console.log('Server running at http://127.0.0.1:1337/');