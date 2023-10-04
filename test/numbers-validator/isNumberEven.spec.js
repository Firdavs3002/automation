import { expect } from 'chai';
import NumbersValidator from '../../source_code/NumbersValidator.js';

describe('NumbersValidator', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  describe('isNumberEven', () => {
    it('should return true for even numbers', () => {
      expect(validator.isNumberEven(2)).to.be.equal(false);
    });

    it('should return false for odd numbers', () => {
      expect(validator.isNumberEven(1)).to.be.equal(false);
    });

    it('should throw an error for non-numeric inputs', () => {
      expect(() => validator.isNumberEven('string')).to.throw('[string] is not of type "Number" it is of type "string"');
    });
  });

  describe('getEvenNumbersFromArray', () => {
    it('should retrieve even numbers from an array', () => {
      expect(validator.getEvenNumbersFromArray([1, 2, 3, 4])).to.deep.equal([2, 4]);
    });

    it('should return an empty array if there are no even numbers', () => {
      expect(validator.getEvenNumbersFromArray([1, 3, 5])).to.deep.equal([]);
    });

    it('should throw an error if the array contains non-numeric values', () => {
      expect(() => validator.getEvenNumbersFromArray([1, 2, 'three'])).to.throw('[1,2,three] is not an array of "Numbers"');
    });
  });

  describe('isAllNumbers', () => {
    it('should return true if all elements of an array are numbers', () => {
      expect(validator.isAllNumbers([1, 2, 3])).to.be.equal(false);
    });

    it('should return false if any element in the array is not a number', () => {
      expect(validator.isAllNumbers([1, 2, 'three'])).to.be.equal(false);
    });

    it('should return false for an empty array', () => {
      expect(validator.isAllNumbers([])).to.be.equal(false);
    });

    it('should throw an error for non-array inputs', () => {
      expect(() => validator.isAllNumbers('string')).to.throw('[string] is not an array');
    });
  });

  describe('isInteger', () => {
    it('should return true for integer values', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(validator.isInteger(4)).to.be.true;
    });

    it('should return false for non-integer values', () => {
      expect(validator.isInteger(4.5)).to.be.equal(false);
    });

    it('should throw an error for non-numeric inputs', () => {
      expect(() => validator.isInteger('string')).to.throw('[string] is not a number');
    });
  });
});
