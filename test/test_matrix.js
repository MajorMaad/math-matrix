var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var Matrix = require('../src/matrix');

describe('Matrix', function() {
    var m1, m2, m3, m4;

    beforeEach(function() {
        m1 = new Matrix([
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12]
        ]);

        m2 = new Matrix([
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12]
        ]);

        m3 = new Matrix([
            [12, 11, 10, 9],
            [8, 7, 6, 5],
            [4, 3, 2, 1]
        ]);

        m4 = new Matrix([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [10, 11, 12]
        ]);
    });

    describe('constructor', function() {
        it('should create a matrix with the array passed', function() {
            expect(new Matrix([[12, 34], [56, 78]]).getArray()).to.be.eql([[12, 34], [56, 78]]);
        });

        it('should create a matrix of 0\'s', function() {
            expect(new Matrix(3, 3).getArray()).to.be.eql([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
        });

        it('should throw an Error (null arg)', function() {
            expect(function(){
                new Matrix(null);
            }).to.throw(Error);
        });

        it('should throw an Error (unique arg)', function() {
            expect(function(){
                new Matrix(0);
            }).to.throw(Error);
        });

        it('should throw an Error (negative arg)', function() {
            expect(function(){
                new Matrix(-1, 2);
            }).to.throw(Error);
        });

        it('should throw an Error (0 as an arg)', function() {
            expect(function(){
                new Matrix(0, 2);
            }).to.throw(Error);
        });

        it('should throw an Error (string arg)', function() {
            expect(function(){
                new Matrix('str');
            }).to.throw(Error);
        });

        it ('should throw an Error (1D array)', function() {
            expect(function() {
                new Matrix([5, 3]);
            }).to.throw(Error);
        });

        it ('should throw an Error (Array with strings)', function() {
            expect(function() {
                new Matrix([[5, 3], [2, 'str']]);
            }).to.throw(Error);
        });

        it ('should throw an Error (Columns not the same length)', function() {
            expect(function() {
                new Matrix([[5, 3], [3, 2, 1]]);
            }).to.throw(Error);
        });
    });

    describe('getters', function() {
        it ('should return the number of rows', function() {
            expect(m1.getNumberRows()).to.be.equal(3);
        });

        it ('should return the number of columns', function() {
            expect(m1.getNumberColumns()).to.be.equal(4);
        });

        it ('should return the matrix as an array', function() {
            expect(m1.getArray()).to.be.eql([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12]
            ]);
        });
    });

    describe('addition', function() {
        it('should add m1 and m2', function() {
            var result = m1.add(m2);
            expect(result.getArray()).to.be.eql([
                [2, 4, 6, 8],
                [10, 12, 14, 16],
                [18, 20, 22, 24]
            ]);
        });

        it('should throw an Error, impossible to add two matrices which are not the same dimension', function() {
            expect(function() {
                m1.add(m4);
            }).to.throw(Error);
        });
    });

    describe('substraction', function() {
        it('should substract m1 and m2', function() {
            var result = m1.substract(m2);
            expect(result.getArray()).to.be.eql([
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]);
        });

        it('should throw an Error, impossible to substract two matrices which are not the same dimension', function() {
            expect(function() {
                m1.substract(m4);
            }).to.throw(Error);
        });
    });

    describe('multiplication', function() {
        it('should throw an Error, impossible to multiply two matrices if the number of Columns of the first one != number of Rows of the second one', function() {
            expect(function() {
                m2.multiply(m3);
            }).to.throw(Error);
        });

        it('should multiply m1 and m4', function() {
            var result = m1.multiply(m4);
            expect(result.getArray()).to.be.eql([
                [70, 80, 90],
                [158, 184, 210],
                [246, 288, 330]
            ]);
        });
    });

});
