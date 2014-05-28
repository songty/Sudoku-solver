module.exports = {};

var Sudoku = function () {

};

var squares = [];
var square = {

};


var str = '158 2  6 2   8  9  3  7 8 2 6 74      4 6 7      19 5 4 9 3  2  2  5   8 7  9 413';


module.exports.createStringArray = function(str) {
	var array = [];
	array = str.split('');
	return array;
};

// var game = new Sudoku(str);
// game.solve();