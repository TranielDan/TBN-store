initialize = () => {
	initializeCanvas();
	start();
}

initializeCanvas = () => {
	CANVAS = document.createElement("canvas");
	CTX = CANVAS.getContext("2d");

	CANVAS.width = window.innerWidth;
	CANVAS.height = window.innerHeight;

	CANVAS.id = "debuggingcanvas";

	document.body.appendChild(CANVAS);
}

document.body.onload = initialize;

/* Source material goes here */


// LIP,  Lagrange Polynomial Interpolation
lip = (x0, x3, x, x1, x2) => {
	// Input a number between 0 and 1, get back a number between max-min;
	var diff = Math.abs(x0 - x3),
		deviation = diff / 32,
		x1 = x1 ? x1 : x0 + deviation,
		x2 = x2 ? x2 : x3 - deviation;
	x += 1;
	x *= 1.5;


	return 0 +
		x0 * ((x - 4) / (1 - 4)) * ((x - 2) / (1 - 2)) * ((x - 3) / (1 - 3)) +
		x1 * ((x - 1) / (2 - 1)) * ((x - 4) / (2 - 4)) * ((x - 3) / (2 - 3)) +
		x2 * ((x - 1) / (3 - 1)) * ((x - 2) / (3 - 2)) * ((x - 4) / (3 - 4)) +
		x3 * ((x - 3) / (4 - 3)) * ((x - 1) / (4 - 1)) * ((x - 2) / (4 - 2));
}

class Noiser {
	constructor(seed) {
		var self = this;

		self.seed = "88735"
		self.resolution = 256;
		self.ogperm = [
			[112, 36, 90, 74, 110, 27, 1, 220, 73, 28, 45, 213, 128, 197, 229, 180],
			[28, 39, 108, 18, 139, 101, 66, 214, 195, 238, 199, 177, 138, 216, 3, 95],
			[103, 98, 162, 246, 158, 144, 202, 29, 7, 153, 233, 149, 89, 52, 90, 145],
			[52, 213, 192, 148, 33, 254, 209, 59, 14, 192, 205, 63, 87, 185, 153, 127],
			[40, 148, 17, 232, 189, 125, 28, 191, 173, 10, 143, 224, 14, 56, 35, 56],
			[221, 14, 245, 6, 76, 234, 43, 125, 159, 251, 75, 173, 8, 40, 1, 134],
			[79, 99, 67, 127, 175, 92, 4, 246, 155, 141, 2, 135, 136, 239, 28, 172],
			[148, 138, 40, 43, 24, 49, 21, 95, 201, 10, 255, 223, 40, 80, 142, 2],
			[117, 69, 220, 178, 47, 251, 52, 183, 223, 197, 131, 176, 62, 22, 221, 39],
			[218, 59, 208, 100, 112, 25, 240, 85, 180, 118, 65, 116, 29, 194, 35, 93],
			[63, 168, 56, 123, 69, 179, 96, 38, 90, 51, 95, 61, 134, 224, 239, 147],
			[158, 211, 175, 86, 74, 90, 9, 220, 208, 41, 253, 84, 23, 44, 143, 11],
			[95, 161, 227, 180, 27, 108, 38, 88, 7, 68, 157, 205, 53, 174, 86, 143],
			[165, 84, 227, 6, 72, 188, 155, 138, 186, 247, 67, 43, 41, 198, 96, 100],
			[1, 55, 204, 108, 241, 245, 238, 240, 33, 207, 188, 112, 203, 196, 35, 188],
			[177, 251, 224, 107, 139, 156, 212, 254, 37, 243, 110, 109, 207, 67, 11, 112]
		]

		self.permutation = [
			[112, 36, 90, 74, 110, 27, 1, 220, 73, 28, 45, 213, 128, 197, 229, 180],
			[28, 39, 108, 18, 139, 101, 66, 214, 195, 238, 199, 177, 138, 216, 3, 95],
			[103, 98, 162, 246, 158, 144, 202, 29, 7, 153, 233, 149, 89, 52, 90, 145],
			[52, 213, 192, 148, 33, 254, 209, 59, 14, 192, 205, 63, 87, 185, 153, 127],
			[40, 148, 17, 232, 189, 125, 28, 191, 173, 10, 143, 224, 14, 56, 35, 56],
			[221, 14, 245, 6, 76, 234, 43, 125, 159, 251, 75, 173, 8, 40, 1, 134],
			[79, 99, 67, 127, 175, 92, 4, 246, 155, 141, 2, 135, 136, 239, 28, 172],
			[148, 138, 40, 43, 24, 49, 21, 95, 201, 10, 255, 223, 40, 80, 142, 2],
			[117, 69, 220, 178, 47, 251, 52, 183, 223, 197, 131, 176, 62, 22, 221, 39],
			[218, 59, 208, 100, 112, 25, 240, 85, 180, 118, 65, 116, 29, 194, 35, 93],
			[63, 168, 56, 123, 69, 179, 96, 38, 90, 51, 95, 61, 134, 224, 239, 147],
			[158, 211, 175, 86, 74, 90, 9, 220, 208, 41, 253, 84, 23, 44, 143, 11],
			[95, 161, 227, 180, 27, 108, 38, 88, 7, 68, 157, 205, 53, 174, 86, 143],
			[165, 84, 227, 6, 72, 188, 155, 138, 186, 247, 67, 43, 41, 198, 96, 100],
			[1, 55, 204, 108, 241, 245, 238, 240, 33, 207, 188, 112, 203, 196, 35, 188],
			[177, 251, 224, 107, 139, 156, 212, 254, 37, 243, 110, 109, 207, 67, 11, 112]
		]

		self.dim = self.ogperm.length;

		seed = parseInt(seed);
		seed = Number.isNaN(seed) ? "88735" : String(seed);

		self.needsSeed = (seed == self.seed);

		self.updatePermutations();
	}
}

Noiser.prototype.generateSeed = () => {
	return "13721"; // Garanteed random.
}

Noiser.prototype.updatePermutations = function () {
	var self = this;
	for (var y = 0; y < self.permutation.length; y++) {
		for (var x = 0; x < self.permutation[y].length; x++) {
			self.permutation[y][x] = self.ogperm[y][x] * parseInt(self.seed);
			self.permutation[y][x] = self.permutation[y][x] % 256;
		}
	}
}

Noiser.prototype.getAt = function (x, y) {
	var self = this;
	var xIndex = Math.floor(x / self.resolution) % self.dim; /*+x%16*/
	var xPeer = (xIndex + 1) % self.dim



	var yIndex = Math.floor(y / self.resolution) % self.dim;
	var yPeer = (yIndex + 1) % self.dim

	var xAt0 = lip(self.permutation[yIndex][xIndex], self.permutation[yIndex][xPeer], (x % self.resolution + self.resolution / 8) / self.resolution);
	var xAt1 = lip(self.permutation[yPeer][xIndex], self.permutation[yPeer][xPeer], (x % self.resolution + self.resolution / 8) / self.resolution);

	var at = lip(xAt0, xAt1, (y % self.resolution) / self.resolution);

	return at;
}

Noiser.prototype.getRGBAt = function (x, y) {
	// For canvas debugging
	var self = this;
	var color = parseInt(self.getAt(x, y));
	color = color < 0 ? 0 : color > 256 ? 256 : color;
	return "rgb(" + color + "," + Math.floor(color) + "," + Math.floor(color) + ")";
}

/* Start the test program*/

start = () => {
	noise = new Noiser;
	offset = 0;
	draw();
}

draw = () => {
	//offset += 1;
	CTX.clearRect(0, 0, 256, 256);
	noise.seed = String(parseInt(noise.seed) + 1);
	noise.updatePermutations();

	for (var y = 0; y < window.innerHeight; y++) {
		for (var x = 0; x < window.innerWidth; x++) {
			CTX.fillStyle = noise.getRGBAt(x, y);
			CTX.fillRect(x, y, 1, 1);
		}
	}
	//setTimeout(draw, 1000 / 60)
}