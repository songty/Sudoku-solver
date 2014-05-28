var chai = require('chai');
var expect = chai.expect;
var _ = require('../sudoku');


describe('createStringArray()', function() {
	it('makes an array from string input', function() {
		expect(_.createStringArray('54 23')).to.be.eql(['5','4',' ','2','3']);
	});
});