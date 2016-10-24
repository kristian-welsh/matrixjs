define(function(require) {
	Matrix = function() {
		populate = function(a, b, c) {
			console.log("populate(a: " + a + ", b: " + b + ", c: " + c + ");");
		}
		isUint = function(a) {
			return isNum(a) && ((a % 1) == 0);
		}
		isNum = function(a) {
			return !isNaN(a);
		}
		isArray = function(a) {
			return a.push != null;
		}
	
		isData = function(args) {
			for (var i = 0; i < args.length; i++) {
				if (!(isArray(args[i]))){
					return false;
				}
				for (var j = 0; j < args[i].length; j++) {
					if (isArray(args[i][j])){
						return false;
					}
				}
			}
			return true;
		}
		isValidData = function(args) {
			var width = args[0].length;
			for (var i = 0; i < args.length; i++) {
				if (args[i].length != width)
					return false;
				for (var j = 0; j < args[i].length; j++)
					if (args[i][j] === null || args[i][j] === undefined || !isNum(args[i][j]))
						return false;
			}
			return true;
		}
		invalidMatrix = function(args) {
			console.log("Invalid Matrix. Arguments: " + args);
		}


		var data;

		var args = [];
		for(var i = 0; i < arguments.length; ++i) {
			args[i] = arguments[i];
		}

		if (args.length == 0) {
			populate(4, 4, 0);
		} else if (args.length == 1 && isUint(args[0])) {
			populate(args[0], args[0], 0);
		} else if (args.length == 2 && isUint(args[0]) && isUint(args[1])) {
			populate(args[0], args[1], 0);
		} else if (args.length == 3 && isUint(args[0]) && isUint(args[1]) && isNum(args[2])) {
			populate(args[0], args[1], args[2]);
		} else if (args.length == 1 && isArray(args[0]) && isData(args[0])) {

			if(isValidData(args[0])) {
				data = args[0];
			} else {
				invalidMatrix(args[0]);
			}

		} else if (isData(args)) {

			if (isValidData(args)) {
				data = args;
			} else {
				invalidMatrix(args);
			}

		} else {
			invalidMatrix(args);
		}


		console.log("Valid Matrix. Arguments: " + args);

	}
return Matrix;
});
