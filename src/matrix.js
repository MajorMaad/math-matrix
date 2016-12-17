(function() {
    'use strict';

    /**
     * Object representing a matrix
     * @param {arguments} data Optional
     *           - 2D array to populate the matrix ([[a,b],[c,d]])
     *           - Dimensions of the matrix (x, y)
     */
    var Matrix = function(data) {

        this.data = [];

        // Populate matrix with 0s if data represents the dimensions
        if (arguments.length == 2 && typeof arguments[0] == 'number' && typeof arguments[1] == 'number') {
            if (arguments[0] <= 0 || arguments[1] <= 0) throw new Error('The dimension of the matrix should be positive');

            this.numberRows = arguments[0];
            this.numberColums = arguments[1];

            var column;
            for (var i=0; i<this.numberRows; i++) {
                column = [];
                for (var j=0; j<this.numberColums; j++) {
                    column.push(0);
                }
                this.data.push(column);
            }

            return;
        }

        if(!Array.isArray(data)) throw new Error('You should pass an Array');

        var colLength;
        for (var i=0; i<data.length; i++) {
            if (!Array.isArray(data[i])) throw new Error('You should pass a 2D Array');

            if (i===0) {
                colLength = data[i].length;
            } else {
                if (data[i].length != colLength) throw new Error('All the columns of the matrix should be the same length');
            }

            for (var j=0; j<data[i].length; j++) {
                if (typeof data[i][j] != 'number') throw new Error('You should pass a 2D Array of numbers');
            }
        }

        this.numberRows = data.length;
        this.numberColums = colLength;
        this.data = data;

    };

    /**
     * Get number of rows of the matrix
     * @return {Number} numberRows
     */
    Matrix.prototype.getNumberRows = function() {
        return this.numberRows;
    };

    /**
     * Get number of columns of the matrix
     * @return {Number} numberColums
     */
    Matrix.prototype.getNumberColumns = function() {
        return this.numberColums;
    };

    /**
     * Get the matrix as an Array
     * @return {Array} data
     */
    Matrix.prototype.getArray = function() {
        return this.data;
    };

    /**
     * Add a matrix to the current, and return a new Matrix
     * that is the sum of the two
     * @param {Matrix} matrix matrix to add to the current
     * @return {Matrix}
     */
    Matrix.prototype.add = function(matrix) {
        if (this.getNumberRows() !== matrix.getNumberRows() && this.getNumberColumns() !== matrix.getNumberColumns())
            throw new Error('You cannot add two matrices of different dimension');

        var m1Array = this.getArray();
        var m2Array = matrix.getArray();
        var arrayResult = [];
        for (var i=0; i<this.getNumberRows(); i++) {
            var column = [];
            for (var j=0; j<this.getNumberColumns(); j++) {
                column.push(m1Array[i][j] + m2Array[i][j]);
            }
            arrayResult.push(column);
        }

        return new Matrix(arrayResult);
    };

    /**
     * Substract a matrix from the current, and return a new Matrix
     * that is the substraction of the two
     * @param  {Matrix} matrix matrix to substract
     * @return {Matrix}
     */
    Matrix.prototype.substract = function(matrix) {
        if (this.getNumberRows() !== matrix.getNumberRows() && this.getNumberColumns() !== matrix.getNumberColumns())
            throw new Error('You cannot substract two matrices of different dimension');

        var m1Array = this.getArray();
        var m2Array = matrix.getArray();
        var arrayResult = [];
        for (var i=0; i<this.getNumberRows(); i++) {
            var column = [];
            for (var j=0; j<this.getNumberColumns(); j++) {
                column.push(m1Array[i][j] - m2Array[i][j]);
            }
            arrayResult.push(column);
        }

        return new Matrix(arrayResult);
    };

    /**
     * Multiply a matrix to the current, and return a new Matrix
     * that is the multiplication of the two
     * @param  {Matrix} matrix matrix to multiply
     * @return {Matrix}
     */
    Matrix.prototype.multiply = function(matrix) {
        if (this.getNumberColumns() !== matrix.getNumberRows())
            throw new Error('You cannot multiply two matrices with the number of columns of matrix 1 different from the number of rows of matrix 2');

        var m1Array = this.getArray();
        var m2Array = matrix.getArray();
        var arrayResult = [];

        for (var i=0; i<this.getNumberRows(); i++) {
            var resultLine = [];

            for (var j=0; j<matrix.getNumberColumns(); j++) {
                var sum = 0;

                for (var k=0; k<this.getNumberColumns(); k++) {
                    sum += (m1Array[i][k] * m2Array[k][j]);
                }

                resultLine.push(sum);
            }

            arrayResult.push(resultLine);
        }

        return new Matrix(arrayResult);
    };

    module.exports = Matrix;
}());
