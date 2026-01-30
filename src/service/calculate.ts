export type OPERATION = 'add' | 'subtract' | 'multiply' | 'divide';

export const calculate = (
  a: number,
  b: number,
  operation: OPERATION,
): number => {
  switch (operation) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      return a / b;
    default:
      throw new Error('Invalid operation');
  }
};
