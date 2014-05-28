module.exports = {};

var Sudoku = function() {
};

var Square = function(num) {
	this.row = '';
	this.column = '';
	this.region = '';
	this['1'] = '';
	this['2'] = '';
	this['3'] = '';
	this['4'] = '';
	this['5'] = '';
	this['6'] = '';
	this['7'] = '';
	this['8'] = '';
	this['9'] = '';

	if (num !== " ") {
		this[num] = true;
	} 
};

var allSquares = [];



var str = '158 2  6 2   8  9  3  7 8 2 6 74      4 6 7      19 5 4 9 3  2  2  5   8 7  9 413';


module.exports.createStringArray = function(str) {
	var array = [];
	array = str.split('');
	return array;
};

testSqaure = new Square('1');

console.log(testSqaure);
// var game = new Sudoku(str);
// game.solve();