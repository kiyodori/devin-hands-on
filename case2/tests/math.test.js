const { average } = require('../src/utils/math.js');

describe('average function', () => {
  test('should return 0 for empty array', () => {
    expect(average([])).toBe(0);
  });

  test('should return the value itself for single element array', () => {
    expect(average([5])).toBe(5);
    expect(average([42])).toBe(42);
    expect(average([0])).toBe(0);
  });

  test('should calculate correct average for multiple positive numbers', () => {
    expect(average([1, 2, 3])).toBe(2);
    expect(average([10, 20, 30, 40])).toBe(25);
    expect(average([1, 3, 5, 7, 9])).toBe(5);
  });

  test('should handle negative numbers correctly', () => {
    expect(average([-1, -2, -3])).toBe(-2);
    expect(average([-10, 10])).toBe(0);
    expect(average([-5, 0, 5])).toBe(0);
  });

  test('should handle mixed positive and negative numbers', () => {
    expect(average([-1, 1, -2, 2])).toBe(0);
    expect(average([1, -1, 3, -3, 5])).toBe(1);
  });

  test('should handle decimal numbers', () => {
    expect(average([1.5, 2.5, 3.5])).toBe(2.5);
    expect(average([0.1, 0.2, 0.3])).toBeCloseTo(0.2, 10);
  });
});
