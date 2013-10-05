var connect = require('connect');

var app = connect()
    .use(connect.static('public'))
    .listen(1337);

console.log('Server running at http://127.0.0.1:1337/');