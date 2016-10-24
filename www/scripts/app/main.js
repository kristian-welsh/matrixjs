define(function(require) {
	var Matrix = require('./matrix');
	
	var canvas = document.getElementById("canvas");
	alert(canvas);

	new Matrix(1);
	new Matrix(2);
	new Matrix(3);
});
