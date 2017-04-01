var on = {}

on.data = function(data) {
    console.log(data.toString());
}

var ClientCommunication = require("./comms.js"),
    client = new ClientCommunication(on, () => {
        console.log("Starting with client communications");
    });
