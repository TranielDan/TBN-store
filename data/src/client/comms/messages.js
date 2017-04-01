/**
@namespace Messages
*/

var MessageHandler = function() {
    var self = this;
    self.catchers = {};
    self.
}

MessageHandler.prototype.addHandler = function(ball, callback) {
    this.addCatcher(ball);
    this.catchers[ball].push(callback);
}

MessageHandler.prototype.addCatcher = function(ball) {
    if (!this.catchers[ball]) {
        this.catchers[ball] = [];
    }
}

module.exports = MessageHandler;
