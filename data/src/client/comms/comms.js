/**
@namespace ClientCommunication
*/
var net = require("net");

/**
Creates a communications object for the client
@todo Implement into messages
@memberof ClientCommunication
@class ClientCommunication
*/
var ClientCommunication = function(events, callback) {
    var self = this;
    self.port = 3328;
    self.events = events;
    self.serverConnection = new net.createConnection({
        port: self.port
    }, () => {
        callback();
        self.setupHandlers();

    });

}
/**
Basically sets up all the event handlers for each emitter. The user has the option of giving their own event handlers but default ones are provided
@memberof ClientCommunication.ClientCommunication
*/
ClientCommunication.prototype.setupHandlers = function() {
    var self = this;
    Object.keys(ClientCommunication.prototype).forEach((key) => {
        var emit = key.slice(3);
        if (key.slice(0, 3) == "on_") {
            self.serverConnection.on(emit, (self.events[emit] ? self.events[emit] : self[key]));
        }
    });
}
/**
When data is recieved
@memberof ClientCommunication.ClientCommunication
*/
ClientCommunication.prototype.on_data = function(data) {
    data = data.toString();
    console.log("Incoming data:");
    console.log(data.toString());
}
/**
When the connection is terminated
@memberof ClientCommunication.ClientCommunication
*/
ClientCommunication.prototype.on_end = function() {
    console.log(arguments);
}

ClientCommunication.prototype.on_connection = function() {
    console.log(arguments);
}
return module.exports = ClientCommunication;
