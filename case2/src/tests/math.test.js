import { average } from '../utils/math.js';

describe('average function', () => {
  test('should return 0 for empty array', () => {
    expect(average([])).toBe(0);
  });

  test('should return the value itself for single element array', () => {
    expect(average([5])).toBe(5);
    expect(average([42])).toBe(42);
    expect(average([0])).toBe(0);
  });

  test('should calculate correct average for multiple positive values', () => {
    expect(average([1, 2, 3])).toBe(2);
    expect(average([2, 4, 6, 8])).toBe(5);
    expect(average([10, 20, 30])).toBe(20);
  });

  test('should handle negative numbers correctly', () => {
    expect(average([-1, -2, -3])).toBe(-2);
    expect(average([-5, 5])).toBe(0);
    expect(average([-10, 0, 10])).toBe(0);
  });

  test('should handle mixed positive and negative numbers', () => {
    expect(average([1, -1, 2, -2])).toBe(0);
    expect(average([-1, 2, 3])).toBe(4/3);
  });

  test('should handle decimal numbers', () => {
    expect(average([1.5, 2.5, 3.5])).toBe(2.5);
    expect(average([0.1, 0.2, 0.3])).toBeCloseTo(0.2, 5);
  });
});
