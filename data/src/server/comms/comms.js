/**
Has methods for handling communications between client and servers
@example
       Tiers of modules
--------------|
|    Server   | High order
--------------|
| CommMessage | Medium order
--------------|
|    Comm     | Low order
--------------|

@namespace Communication
@memberof Server
*/

const net = require("net");
const utils = require("../utils.js");

for (var i = 0; i < 10; i++) {
    console.log(utils.generateTBID());
}


/**
Creates a communication channel for the server to be accessed
@memberof Communication
*/
var Communication = function() {
    var self = this;
    self.connections = {};
    self.requestBuffer = [];
    self.port = 3328; // Sandra's number.
}
/**
Starts listening on the communication port for any messages, uses http.
@todo Don't use http
@memberof Communication
*/
Communication.prototype.startListening = function() {
    var self = this;
    console.log("Starting server on port " + this.port);
    this.server = net.createServer((client) => {
        self.connectionHandler(client);
        //self.connections
    });
    this.listener = this.server.listen(this.port, this.listenHandler);
}
/**
Handles incoming connections with new clients
@todo Implement sockets
@memberof Comminication
*/
Communication.prototype.connectionHandler = function(client) {
    console.log(client);
    console.log("connected to a new client, assigning TBID...");
    client.write(JSON.stringify({
        tbid: utils.generateTBID()
    }));
    console.log(client);
    // What does this even do?
    client.pipe(client);
}

/**
Handles listening stuff
@todo learn what listening does
@memberof Comminication
*/
Communication.prototype.listenHandler = function() {
    console.log("Server started... Listening for incoming connections");
}

return module.exports = Communication;
