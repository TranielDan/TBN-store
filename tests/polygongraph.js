/**
 * <img src="https://i.gyazo.com/b03696c903a05569525b43386dd2b8cc.gif">
 * <p>Polygon graphs are used to display numerical infromation in a geometric format.</p>
 * @namespace Polygongraph
 * @memberof Tests
 * 
 * @example
 * // Create new instance
 * var polygonGraph = new PolygonGraph(
 *  5, // Amount of arms
 *  100, // Max value of each arm
 *  100, // Container width
 *  100, // Container height
 *  ["a","b","c","d","e"], // Labels for each arm, respectively
 *  [100,50,20,60,10] // values for each arm, respectively
 * )
 *
 * // Add it to the DOM
 * document.body.appendChild(polygonGraph)
 *
 * // Draw it
 * polygonGraph.draw();
 */

initialize = () => {
    initializeCanvas();
    start();
}

initializeCanvas = () => {
    CANVAS = document.createElement("canvas");
    CANVAS.onload = start;
    CTX = CANVAS.getContext("2d");

    CANVAS.width = 100;
    CANVAS.height = 100;

    CANVAS.id = "debuggingcanvas";

    document.body.appendChild(CANVAS);
}

document.body.onload = initialize;

/* Source material goes here */

/**
 * Does stuff for each element of an array
 * @param {Tests.Polygongraph.forIndexCallback} callback that handles operations for each element of an array
 * @memberof Tests.Polygongraph
 * @return {array}
 * @example
 * [1,2,3].forIndex((index, value, self)=>{
 *  console.log([index, value, self]);
 * })
 *
 * // Console output:
 * // [0, 1, [1,2,3]]
 * // [1, 2, [1,2,3]]
 * // [2, 3, [1,2,3]]
 */
Array.prototype.forIndex = function (callback) {
    var self = this;
    var output = [];
    for (var i = 0; i < self.length; i++) {
        output.push(callback(i, self[i], self));
    }
    return output;
}

/**
 * @callback forIndexCallback
 * @memberof Tests.Polygongraph
 * @param {number} index index of current element
 * @param {any} element the current element
 * @param {array} self entire array
 * @return {any}
 */

/**
 * Maps a number to a value between two numbers
 * @memberof Tests.Polygongraph
 * @param {number} start First number of base range
 * @param {number} end Second number of base range
 * @param {number} min First number of new range
 * @param {number} max second number of new range
 * @return {number}
 * @example
 * (10).map(0,20,0,100) // -> 50
 * (25).map(0,100,0,4) // -> 1
 */
Number.prototype.map = function (start, end, min, max) {
    if (!this.isBetweenOrEqualTo(start, end)) {
        return 0;
    }
    return (this - start) / (end - start) * (max - min) + min;
}

/**
 * Checks to see if a number is between or equal any two values
 * @memberof Tests.Polygongraph
 * @param {number} numberA first number
 * @param {number} numberB second number
 * @return {bool}
 * @example
 * (1).isBetweenOrEqualTo(0,10) // -> true
 * (100).isBetweenOrEqualTo(0,10) // -> false
 */
Number.prototype.isBetweenOrEqualTo = function (start, end) {
    return this >= start && this <= end;
}

/**
 * Converts degrees to radians
 * @memberof Tests.Polygongraph
 * @return {number}
 * @example
 * (180).degreesToRad() // -> 3.14...
 */
Number.prototype.degreesToRad = function () {
    return Math.PI / 180 * this
}

/**
 * Polygon graph class, includes all methods for creating and modifying a polygon graph
 *  * <img src="http://i.imgur.com/yRB7W7g.png">
 * @memberof Tests.Polygongraph
 * @example
 * // Create new instance
 * var polygonGraph = new PolygonGraph(
 *  5, // Amount of arms
 *  100, // Max value of each arm
 *  100, // Container width
 *  100, // Container height
 *  ["a","b","c","d","e"], // Labels for each arm, respectively
 *  [100,50,20,60,10] // values for each arm, respectively
 * )
 *
 * // Add it to the DOM
 * document.body.appendChild(polygonGraph)
 *
 * // Draw it
 * polygonGraph.draw();
 */
class PolygonGraph {
    /**
     * Creates an instance of PolygonGraph.
     * @param {number} amountOfArms Amount of lines that appear on the polygon graph
     * @param {any} maxValue Max value of the arms, at the ends it will be this number, at the center it will be 0
     * @param {any} height Height of the graph
     * @param {any} width Width of the graph
     * @param {any} labels Labels for each arm, respectively
     * @param {any} values Values for each arm, respectively
     * 
     * @memberOf Tests.Polygongraph.PolygonGraph
     */
    constructor(amountOfArms, maxValue, height, width, labels, values) {
        var self = this;
        self.amountOfArms = amountOfArms;
        self.maxValue = maxValue;
        self.height = height;
        self.width = width;
        self.data = labels.forIndex((index, value) => {
            return {
                label: value,
                value: values[index]
            }
        });

        self.element = document.createElement("canvas");
        self.element.height = self.height;
        self.element.width = self.width;
        self.ctx = self.element.getContext("2d");
        self.element.height
    }
}

/**
 * Calculate the endpoints for each arm, respectively
 * @memberof Tests.Polygongraph.PolygonGraph
 * @return {array}
 */
PolygonGraph.prototype.getArmPoints = function () {
    var self = this;
    self.angle = self.calculateAngles();
    self.armPoints = [];

    for (var i = 0; i < self.amountOfArms; i++) {
        self.armPoints[i] = [(Math.cos((self.angle * i).degreesToRad()) * self.width / 2) + self.width / 2, (Math.sin((self.angle * i).degreesToRad()) * self.height / 2) + self.height / 2];
    }
    return self.armPoints;
}

/**
 * Updates the values of each arm
 * @memberof Tests.Polygongraph.PolygonGraph
 * @return {array}
 * @todo Make the values scale based on the max value, instead of the dimensions of the canvas
 */
PolygonGraph.prototype.updateArmValues = function () {
    var self = this;
    self.getArmPoints();
    self.armValues = [];
    for (var i = 0; i < self.armPoints.length; i++) {
        self.armValues[i] = [(Math.cos((self.angle * i).degreesToRad()) * self.data[i].value / 2) + self.width / 2, (Math.sin((self.angle * i).degreesToRad()) * self.data[i].value / 2) + self.height / 2];
    }
    return self.armValues;
}

/**
 * Draws the graph onto it's own canvas
 * @memberof Tests.Polygongraph.PolygonGraph
 */
PolygonGraph.prototype.draw = function () {
    var self = this;

    self.ctx.clearRect(0, 0, self.width, self.height);

    self.updateArmValues();
    var armV = self.armValues[0];
    self.ctx.beginPath();

    self.ctx.strokeStyle = "rgb(200,150,150)";
    for (var i = 0; i < self.amountOfArms; i++) {
        var armV2 = self.armValues[i + 1] ? self.armValues[i + 1] : self.armValues[0];
        self.ctx.moveTo(armV[0], armV[1]);
        self.ctx.lineTo(armV2[0], armV2[1]);
        armV = armV2;
    }

    self.ctx.closePath();
    self.ctx.fill();
    self.ctx.lineWidth = 2;
    self.ctx.stroke();
    for (var i = 0; i < self.armValues.length; i++) {
        var arm = self.armPoints[i];

        self.ctx.strokeStyle = "#000000";
        self.ctx.beginPath();
        self.ctx.moveTo(self.width / 2, self.height / 2);
        self.ctx.lineTo(arm[0], arm[1]);
        self.ctx.stroke();



    }
}

/**
 * Calculate the angle between each arm
 * @memberof Tests.Polygongraph.PolygonGraph
 * @return {number}
 */
PolygonGraph.prototype.calculateAngles = function () {
    var self = this;
    return 360 / self.amountOfArms;
}

/* Start the test program*/

start = () => {
    console.log("Starting program");
    graph = new PolygonGraph(14, 20, 300, 300, ["a", "b", "c", "d", "e", "a", "b", "c", "d", "e", "a", "b", "c", "d", "e"], [200, 100, 200, 100, 200, 100, 200, 100, 200, 100, 200, 100, 200, 100, 200, 100, 200, 100, 200, 100]);
    document.body.appendChild(graph.element);
    graph.draw();
}