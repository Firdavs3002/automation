import { expect } from 'chai';
// eslint-disable-next-line import/extensions
import NumbersValidator from '../../source_code/NumbersValidator.js';

describe('NumbersValidator', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });

  it('should determine if a number is even', () => {
    expect(validator.isNumberEven(2)).to.be.true;
    expect(validator.isNumberEven(1)).to.be.false;
  });

  it('should retrieve even numbers from an array', () => {
    expect(validator.getEvenNumbersFromArray([1, 2, 3, 4])).to.deep.equal([2, 4]);
  });

  it('should determine if all elements of an array are numbers', () => {
    expect(validator.isAllNumbers([1, 2, 3])).to.be.true;
    expect(validator.isAllNumbers([1, 2, 'three'])).to.be.false;
  });

  it('should determine if a value is an integer', () => {
    expect(validator.isInteger(4)).to.be.true;
    expect(validator.isInteger(4.5)).to.be.false;
  });

  // Tests to cover the uncovered lines

  it('should throw an error if input to isNumberEven is not a number', () => {
    expect(() => validator.isNumberEven('string')).to.throw('[string] is not of type "Number" it is of type "string"');
  });

  it('should throw an error if input to getEvenNumbersFromArray is not an array of numbers', () => {
    expect(() => validator.getEvenNumbersFromArray([1, 2, 'three'])).to.throw('[1,2,three] is not an array of "Numbers"');
  });

  it('should throw an error if input to isAllNumbers is not an array', () => {
    expect(() => validator.isAllNumbers('string')).to.throw('[string] is not an array');
  });

  it('should throw an error if input to isInteger is not a number', () => {
    expect(() => validator.isInteger('string')).to.throw('[string] is not a number');
  });
});
