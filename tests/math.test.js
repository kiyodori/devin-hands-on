import { describe, test, expect } from '@jest/globals';
import { average } from '../case2/src/utils/math.js';

describe('average function', () => {
  test('should return 0 for empty array', () => {
    expect(average([])).toBe(0);
  });

  test('should return 0 for single value array (due to bug)', () => {
    expect(average([5])).toBe(0);
  });

  test('should return partial average for multiple values (due to bug)', () => {
    expect(average([1, 2, 3])).toBe(1);
  });

  test('should handle negative numbers with bug', () => {
    expect(average([-1, -2, -3])).toBe(-1);
  });

  test('should handle mixed positive and negative numbers', () => {
    expect(average([1, -1, 2, -2])).toBe(0.5);
  });

  test('should handle array with two elements', () => {
    expect(average([10, 20])).toBe(5);
  });

  test('should handle decimal numbers', () => {
    expect(average([1.5, 2.5, 3.5])).toBeCloseTo(1.3333333333333333);
  });
});
