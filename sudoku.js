module.exports = {};
var _ = require('lodash');

var Sudoku = function() {
};

var Square = function(num, index) {
	this.row = Math.floor(index / 9) + 1;
	this.column = (index % 9) + 1;
	this.region = determineRegion(this.row, this.column);
	this.solution = ' ';
	if (num !== " ") {
		var i = 1;
		while (i < 10) {
			this[i.toString()] = false;
			i++;
		}
		this[num] = true;
		this.solution = parseInt(num);
	} 
};

var allSquares = [];

var inputString = '158 2  6 2   8  9  3  7 8 2 6 74      4 6 7      19 5 4 9 3  2  2  5   8 7  9 413';

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
	// for(var i = 0; i < 9; i++) {
	// 	console.log('| ' + puzzle[i].solution + '  ' + puzzle[i + 1]);
	// }	
};

var stringArray = createStringArray(inputString);
for(var i = 0; i < 81; i++) {
	var square = new Square(stringArray[i], i);
	allSquares.push(square);
}

drawPuzzle(allSquares);

testSqaure = new Square(' ', 30);

console.log(testSqaure);
// var game = new Sudoku(str);
// game.solve();