module.exports = {};
var _ = require('lodash');

var Sudoku = function() {
};

Sudoku.prototype.solve = function() {
	if (checkForSolution(allSquares[0])) {

	} else {
		checkRow(allSquares[0]);
		checkColumn(allSquares[0]);
		checkRegion(allSquares[0]);
		if (allSquares[0].falses === 8) {

		}
	}

};

var Square = function(num, index) {
	this.row = Math.floor(index / 9) + 1;
	this.column = (index % 9) + 1;
	this.region = determineRegion(this.row, this.column);
	this.solution = ' ';
	this.falses = 0;
	if (num !== " ") {
		var i = 1;
		while (i < 10) {
			this[i.toString()] = false;
			i++;
		}
		this[num] = true;
		this.solution = parseInt(num);
		this.falses = 8;
	// } else {
	// 	var n = 1;
	// 	while (n < 10) {
	// 		this[n.toString()] = '';
	// 		n++;
	// 	}		
	}
};

var createStringArray = function(str) {
	var array = [];
	array = str.split('');
	return array;
};

var determineRegion = function(row, column) {
	var rowOptions = [];
	var columnOptions = [];
	if(column < 4) {
		columnOptions = [1, 4, 7];
	} else if (column < 7) {
		columnOptions = [2, 5, 8];
	} else {
		columnOptions = [3, 6, 9];
	}
	if(row < 4) {
		rowOptions = [1, 2, 3];
	} else if (row < 7) {
		rowOptions = [4, 5, 6];
	} else {
		rowOptions = [7, 8, 9];
	}
	var intersect = _.intersection(rowOptions, columnOptions);
	return intersect[0];
};

var drawThreeRows = function(puzzle, i) {
	var n = i + 27;
	while (i < n) {
		console.log('| ' + puzzle[i].solution + '  ' + puzzle[i + 1].solution +
			'  ' + puzzle[i + 2].solution + ' | ' + puzzle[i + 3].solution +
			'  ' + puzzle[i + 4].solution + '  ' + puzzle[i + 5].solution +
			' | ' + puzzle[i + 6].solution + '  ' + puzzle[i + 7].solution +
			'  ' + puzzle[i + 8].solution + ' |');
		i = i + 9;
	}
};

var drawPuzzle = function(sudoku) {
	console.log('+---------+---------+---------+');
	drawThreeRows(sudoku, 0);
	console.log('+---------+---------+---------+');
	drawThreeRows(sudoku, 27);
	console.log('+---------+---------+---------+');
	drawThreeRows(sudoku, 54);
	console.log('+---------+---------+---------+');
};

var checkForSolution = function (obj) {
	if (obj.solution === ' ') {
		return false;
	} else {
		return true;
	}
};

var checkRow = function (obj) {
	allSquares.forEach(function(square) {
		if((square.solution !== ' ') && (obj.row === square.row) && (!_.contains(_.keys(obj), square.solution.toString()))) {
			obj[square.solution] = false;
			obj.falses++;
		}
	});
};

var checkColumn = function (obj) {
	allSquares.forEach(function(square) {
		if((square.solution !== ' ') && (obj.column === square.column) && (!_.contains(_.keys(obj), square.solution.toString()))) {
			console.log(!obj[square.solution]);
			obj[square.solution] = false;
			obj.falses++;
		}
	});
};

var checkRegion = function (obj) {
	allSquares.forEach(function(square) {
		if((square.solution !== ' ') && (obj.region === square.region) && (!_.contains(_.keys(obj), square.solution.toString()))) {
			obj[square.solution] = false;
			obj.falses++;
		}
	});
};

var setSolution = function (obj) {
	_.forEach(obj, function(prop) {
		if (prop === '') {
			prop = true;
		}
	});
};

var allSquares =[];

var inputString = '158 2  6 2   8  9  3  7 8 2 6 74      4 6 7      19 5 4 9 3  2  2  5   8 7  9 413';

var stringArray = createStringArray(inputString);
for(var i = 0; i < 81; i++) {
	var square = new Square(stringArray[i], i);
	allSquares.push(square);
}

// drawPuzzle(allSquares);

checkRow(allSquares[69]);
checkColumn(allSquares[69]);
checkRegion(allSquares[69]);
console.log(allSquares[69]);

// // console.log(_.keys(allSquares[0]));

// testSqaure = new Square(' ', 0);

// console.log(testSqaure);
// var game = new Sudoku(str);
// game.solve();