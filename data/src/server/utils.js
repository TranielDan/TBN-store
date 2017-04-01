/**
@namespace Utilities
*/

/**
The same as new Date().getTime();
@returns Number
@memberof Utilities
*/
var createTime = function() {
    return new Date().getTime();
}

/**
Creates a time and converts it into a string that has the same data encoded onto a different base.
@returns String
@memberof NewStuff
*/
var createTimeAndConvert = function(base) {
    return createTime().toString(base);
}

/**
Generates time based id (TBID)
@returns String
@memberof NewStuff
*/
var generateTBID = function() {
    var version = 1;
    return [createTimeAndConvert(32),
        createTimeAndConvert(16),
        version,
        Math.floor(createTime() & Math.floor(Math.random() * 48))
    ].join("-");
}

module.exports = {
    generateTBID: generateTBID
}
