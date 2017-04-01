/**
 * Test programs, Usually programs that will be added to the main program later, but are currently under development or aren't ready to be added yet.
 * @namespace Tests
 */

/**
 * Debugging canvas used as a template for test programs
 * @namespace DebuggingCanvas
 * @memberof Tests
 */


/**
 * Initialize everything once the body loads
 * @memberof Tests.DebuggingCanvas
 */
initialize = () => {
	initializeCanvas();
}

/**
 * Initialize canvas
 * @memberof Tests.DebuggingCanvas
 */
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



/* Start the test program*/

/**
 * User defined start
 * @memberof Tests.DebuggingCanvas
 */
start = () => {
	console.log("Starting program");
}