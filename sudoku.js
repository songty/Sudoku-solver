module.exports = {};
var _ = require('lodash');

var Sudoku = function() {
};

var keyCheck = ['1','2','3','4','5','6','7','8','9'];

var solutions = 0;
var newSolutions = 0;

Sudoku.prototype.solve = function() {
	if (solutions < 81) {
		solutions = 0;
		allSquares.forEach(function(square) {
			solveOneSquare(square);
		});
		if (solutions === newSolutions) {
			console.log('new strategy time');
			bruteForceGuess();
		} else {
			console.log(solutions);
			console.log(newSolutions);
			newSolutions = solutions;
			this.solve();
		}

	}
	else {
		drawPuzzle(allSquares);
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
	}
};

var solveOneSquare = function(square) {
	if (checkForSolution(square)) {
		solutions++;
	} else {
		checkRow(square);
		checkColumn(square);
		checkRegion(square);
		if (square.falses === 8) {
			var foundKeys = _.intersection(_.keys(square), keyCheck);
			var solutionKey = 45 - _.reduce(foundKeys, function(sum, n) {
			return sum + parseInt(n);
			}, 0);
			square.solution = solutionKey;
			var thisObject = square;
			thisObject[solutionKey.toString()] = true;
			solutions++;
		}
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

var unsolvedSquares = [];

var bruteForceGuess = function () {
	var  guessObjArray = [];
	allSquares.forEach(function(square) {
		var guessingArray = _.xor(keyCheck, _.intersection(_.keys(square), keyCheck));
		if (guessingArray.length !== 0){
			guessObjArray.push(guessingArray);
		}
	});
	console.log(guessObjArray.length);
	allSquares.forEach(function(square) {
		if (square.falses !==8) {
			unsolvedSquares.push(square);
		}
	});
	console.log(unsolvedSquares.length);
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
var unsolvablePuzzle = ' 94   13              76  2 8  1     32         2   6     5 4       8  7  63 4  8';

var stringArray = createStringArray(unsolvablePuzzle);
for(var i = 0; i < 81; i++) {
	var square = new Square(stringArray[i], i);
	allSquares.push(square);
}



drawPuzzle(allSquares);
var testSudoku = new Sudoku();
testSudoku.solve();

// // console.log(_.keys(allSquares[0]));

// testSqaure = new Square(' ', 0);

// console.log(testSqaure);
// var game = new Sudoku(str);
// game.solve();