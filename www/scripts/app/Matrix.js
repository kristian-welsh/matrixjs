define(function(require) {
	Matrix = function() {
		var data = [];
    
		populate = function(width, height, value) {
			for (var i = 0; i < height; i++) {
				data.push([]);
				for (var j = 0; j < width; j++) {
					data[i].push(value);
				}
			}
		}
    
    
		this.width = function() {
			return data[0].length;
		}
    
		this.height = function() {
			return data.length;
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
			throw new Error("Invalid Matrix. Arguments: " + args);
		}
		
		this.toString = function() {
			var returnMe = "" + this.width() + " x " + this.height() + " Matrix\n";
			
			for (var i = 0; i < this.height(); i++) {
				returnMe += "| ";
				for (var j = 0; j < this.width(); j++)
					returnMe += data[i][j] + ", ";
				returnMe += " |\n";
			}
			
			return returnMe;
		}
		
		this.updateCell = function(y, x, value) {
			data[y][x] = value;
		}
		
		this.getCell = function(y, x) {
			return data[y][x];
		}
    
    this.init = function() {
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
      console.log("Valid Matrix: " + this.toString());
      
    }
		
		this.add = function(arg) {
			if (!this.sameDimentions(arg))
				incompatableDimentions(arg);
			var newData = new Matrix(this.width(), this.height());
			for (var i = 0; i < this.height(); i++)
				for (var j = 0; j < this.width(); j++)
					newData.updateCell(i, j, this.getCell(i, j) + arg.getCell(i, j));
			return newData;
		}
		
		this.subtract = function(arg) {
			if (!this.sameDimentions(arg))
				incompatableDimentions(arg);
			var newData = new Matrix(this.width(), this.height());
			for (var i = 0; i < this.height(); i++)
				for (var j = 0; j < this.width(); j++)
					newData.updateCell(i, j, this.getCell(i, j) - arg.getCell(i, j));
			return newData;
		}
		
		this.dot = function(arg) {
			if (this.width() != arg.height())
				incompatableDimentions(arg);
			var newData = new Matrix(arg.width(), arg.height());
			for (var i = 0; i < arg.width(); i++) {
				for (var j = 0; j < this.height(); j++) {
					var tempSum = 0;
					for (var k = 0; k < this.width(); k++) {
						tempSum += this.getCell(j, k) * arg.getCell(k, i);
					}
					newData.updateCell(j, i, tempSum);
				}
			}
			return newData;
		}
		
		this.multiply = function(arg) {
			if (!this.sameDimentions(arg))
				incompatableDimentions(arg);
			var newData = new Matrix(this.width(), this.height());
			for (var i = 0; i < this.height(); i++)
				for (var j = 0; j < this.width(); j++)
					newData.updateCell(i, j, this.getCell(i, j) * arg.getCell(i, j));
			return newData;
		}
		
		this.scale = function(arg) {
			var newData = new Matrix(this.width(), this.height());
			for (var i = 0; i < this.height(); i++)
				for (var j = 0; j < this.width(); j++)
					newData.updateCell(i, j, this.getCell(i, j) * arg);
			return newData;
		}
		
		this.transpose = function() {
			var newData = new Matrix(this.height(), this.width());
			for (var i = 0; i < this.height(); i++)
				for (var j = 0; j < this.width(); j++)
					newData.updateCell(j, i, this.getCell(i, j));
			return newData;
		}
		
		this.sameDimentions = function(arg) {
			return this.width() == arg.width() && this.height() == arg.height();
		}
		
		incompatableDimentions = function(arg) {
			throw new Error("Incompatable matrix dimentions. Matrix 1: " + this + "Matrix 2: " + arg);
		}

		var args = [];
		for(var i = 0; i < arguments.length; ++i) {
			args[i] = arguments[i];
		}
    
    this.init(args);
	}
return Matrix;
});
