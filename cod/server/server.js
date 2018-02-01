var util = require('util');
var http = require('http');
var path = require('path');
var ecstatic = require('ecstatic');
var ioServer = require('socket.io');
var port = process.env.PORT || 8080;
// variables del juego
var socket; // Socket controller
// Create and start the http server
var server = http.createServer(ecstatic({ root: path.resolve(__dirname, '../public') })).listen(port, "0.0.0.0", function (err) {
    if (err) {
        throw err;
    }
    init();
});
function init() {
    socket = ioServer.listen(server);
    socket.sockets.on('connection', onSocketConnection);
    //controlMaps = new cServerControlMaps(socket);
}
// New socket connection
function onSocketConnection(client) {
    util.log('New player has connnnected: ' + client.id);
    // Listen for new player message
    //client.on('new player', onNewPlayer)
}
