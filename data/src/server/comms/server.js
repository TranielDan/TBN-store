/**
Contains methods for creating and managing a server
@author Daniel Tran
@version 0.0.1
@namespace Server
*/


/**
Creates an instance of a server
@memberof Server
*/
var Server = function() {
    var self = this;
    self.id = generateTBID();
}
