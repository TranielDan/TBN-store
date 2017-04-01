initialize = () => {
    initializeCanvas();
}

initializeCanvas = () => {
    CANVAS = document.createElement("canvas");
    CANVAS.onload = start;
    CTX = CANVAS.getContext("2d");

    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    CANVAS.id = "debuggingcanvas";

    document.body.appendChild(CANVAS);
}

document.body.onload = initialize;

/* Source material goes here */

class Matrix {
    constructor(matrix, infinite) {
        // Basically an array of vectors
        if (matrix.isMatrix) {
            infinite = matrix.isInfinite;
            matrix = matrix.matrix;
        }
        var self = this;
        var type = Array.isArray(matrix) << Array.isArray(matrix[0]) ^ Object.isVector(matrix[0]) * 2;

        if (type == 0) {
            throw "Invalid matrix";
        }

        //console.log(matrix)

        self.matrix = matrix;
        self.columns = matrix.length;
        self.rows = matrix[0].length;
        self.dims = self.rows + "x" + self.columns;
        self.length = matrix.length;
        self.infinite = !!infinite;
        self.isInfinite = self.infinite;
        self.isMatrix = true;

        switch (type) {
            case 2:
                self.initializeForArrayMatrix();
                break;
            case 3:
                //console.log("duck")
                break;
            default:
                throw "invalid matrix";
                break;
        }

    }
}

Matrix.prototype.initializeForArrayMatrix = function () {
    // Initialize matrix for an arrays
    var self = this;
    for (var i in self.matrix) {
        self.matrix[i] = new Vector(self.matrix[i], self.infinite);
    }
}

Matrix.prototype.add = function (matrix) {
    var self = this,
        matrix = new Matrix(matrix);
    if (!matrix.isMatrix) {
        throw "invalid matrix";
    }
    var out = [];
    for (var i = 0; i < matrix.length; i++) {
        out.push(new Vector(new Int32Array(matrix.matrix[i].length)));
        out[i] = self.matrix[i].add(matrix.matrix[i]);
    }
    return new Matrix(out);
}

Matrix.prototype.scale = function (scalar) {
    var self = this,
        out = [];
    for (var i = 0; i < self.length; i++) {
        out[i] = self.matrix[i].scale(scalar);
    }
    return new Matrix(out);
}

// Linear transformations
Matrix.prototype.multiply = function (matrix) {
    var self = this;
    matrix = new Matrix(matrix);
    if (!matrix.isMatrix) {
        throw "invalid matrix";
    }
    var out = [];
    for (var i = 0; i < matrix.length; i++) {
        var v = [];
        for (var j = 0; j < self.length; j++) {
            v[j] = self.matrix[i].multiply(matrix.matrix[j].vector).vector[0];
        }
        console.log(v, out);
        out.push(new Vector(v));
    }
    //console.log(out)
    return new Matrix(out);
}

Matrix.prototype.toString = function () {
    return this.matrix.map((vectorObject) => {
        return JSON.stringify(vectorObject.vector) + "\n"
    }).toString();
}


/////////////
// Vectors //
/////////////

class Vector {
    constructor(vector, infinite) {
        var self = this;
        // safegaurds
        if (!Array.isArray(vector) && !(vector.constructor === Int32Array)) {
            throw "invalid vector";
        }

        //console.log(vector);

        // TODO merge vector if input is a vector

        // Setup
        self.vector = []

        for (var i in vector) {
            self.vector[i] = vector[i];
        }



        self.length = vector.length;
        self.infinite = !!infinite;
        self.isInfinite = self.infinite;
        self.isVector = true;

    }
}

Vector.prototype.add = function (vector) {
    var self = this;
    if (self.length != vector.length && !self.isInfinite) {
        throw "invalid operation length"
    }

    if (!vector.isVector) {
        vector = new Vector(vector);
    }
    var out = new Int32Array(self.length <= vector.length ? vector.length : self.length);
    for (var i in out) {
        out[i] = (self.vector[i] || 0) + (vector.vector[i] || 0);
    }

    return new Vector(out);
}

Vector.prototype.scale = function (scalar) {
    var self = this;
    return new Vector(self.vector.map((x) => {
        return x * scalar
    }));
}

Vector.prototype.multiply = function (vector) {
    var self = this;
    if (self.length != vector.length && !self.isInfinite) {
        throw "invalid operation length"
    }

    if (!vector.isVector) {
        vector = new Vector(vector);
    }
    var out = 0;
    for (var i = 0; i < (self.length <= vector.length ? vector.length : self.length); i++) {
        out += (!Number.isNaN(self.vector[i]) ? self.vector[i] : 1) * (!Number.isNaN(vector.vector[i]) ? vector.vector[i] : 1);
    }

    return new Vector([out]);
}

Vector.prototype.createLag = function (length, lag) {
    for (var i = 0; i < length; i++) {

    }
}

Object.isVector = (object) => {
    return !!object.isVector;
}

Object.isMatrix = (object) => {
    return !!object.isMatrix;
}


/* Start the test program*/

start = () => {
    console.log("Starting program");
}