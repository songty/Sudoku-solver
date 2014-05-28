module.exports = {};
var _ = require('lodash');

var Sudoku = function() {
};

var Square = function(num, index) {
	this.row = Math.floor(index / 9) + 1;
	this.column = (index % 9) + 1;
	this.region = determineRegion(this.row, this.column);
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

var stringArray = createStringArray(inputString);
for(var i = 0; i < 81; i++) {
	var square = new Square(stringArray[i], i);
	allSquares.push(square);
}

testSqaure = new Square(' ', 30);

console.log(testSqaure);
// var game = new Sudoku(str);
// game.solve();