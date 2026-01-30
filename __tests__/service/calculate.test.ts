import { calculate } from '../../src/service/calculate';

describe('Test service/calculate', () => {
  it('should add two numbers', () => {
    expect(calculate(1, 2, 'add')).toBe(3);
  });

  it('should subtract two numbers', () => {
    expect(calculate(5, 3, 'subtract')).toBe(2);
  });

  it('should multiply two numbers', () => {
    expect(calculate(4, 3, 'multiply')).toBe(12);
  });

  it('should divide two numbers', () => {
    expect(calculate(10, 2, 'divide')).toBe(5);
  });

  it('should throw an error for invalid operation', () => {
    expect(() => calculate(1, 2, 'invalid' as any)).toThrow(
      'Invalid operation',
    );
  });
});
