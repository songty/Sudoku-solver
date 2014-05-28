module.exports = {};

var Sudoku = function() {
};

var Square = function(num, index) {
	this.row = Math.floor(index / 9) + 1;
	this.column = (index % 9) + 1;
	this.region = '';
	if (str !== " ") {
		var i = 1;
		while (i < 10) {
			this[i.toString()] = false;
			i++;
		}
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

testSqaure = new Square('1', 0);

console.log(testSqaure);
// var game = new Sudoku(str);
// game.solve();