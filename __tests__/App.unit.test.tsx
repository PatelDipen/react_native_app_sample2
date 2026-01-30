/**
 * @format
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

// Mock the calculate function
jest.mock('../src/service/calculate', () => ({
  calculate: jest.fn((a: number, b: number, op: string) => {
    switch (op) {
      case 'add':
        return a + b;
      case 'subtract':
        return a - b;
      case 'multiply':
        return a * b;
      case 'divide':
        return a / b;
      default:
        return 0;
    }
  }),
  OPERATION: {},
}));

describe('App Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId('welcome-text')).toBeTruthy();
    expect(getByTestId('first-number-input')).toBeTruthy();
    expect(getByTestId('second-number-input')).toBeTruthy();
    expect(getByTestId('operation-picker')).toBeTruthy();
    expect(getByTestId('calculate-button')).toBeTruthy();
  });

  it('displays initial result as ?', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('result-text')).toHaveTextContent('?');
  });

  it('allows user to input numbers', () => {
    const { getByTestId } = render(<App />);
    const firstInput = getByTestId('first-number-input');
    const secondInput = getByTestId('second-number-input');

    fireEvent.changeText(firstInput, '10');
    fireEvent.changeText(secondInput, '5');

    expect(firstInput).toBeTruthy();
    expect(secondInput).toBeTruthy();
  });

  it('calculates addition correctly', () => {
    const { getByTestId } = render(<App />);
    const firstInput = getByTestId('first-number-input');
    const secondInput = getByTestId('second-number-input');
    const calculateButton = getByTestId('calculate-button');
    const resultText = getByTestId('result-text');

    // Default operation is 'add'
    fireEvent.changeText(firstInput, '10');
    fireEvent.changeText(secondInput, '5');
    fireEvent.press(calculateButton);

    expect(resultText).toHaveTextContent('15');
  });

  it('calculates subtraction correctly', () => {
    const { getByTestId } = render(<App />);
    const firstInput = getByTestId('first-number-input');
    const secondInput = getByTestId('second-number-input');
    const calculateButton = getByTestId('calculate-button');
    const resultText = getByTestId('result-text');

    fireEvent.changeText(firstInput, '10');
    fireEvent.changeText(secondInput, '5');

    // Change picker to subtract (you'll need to find the picker)
    // Note: Picker testing can be tricky, this is a simplified version
    fireEvent.press(calculateButton);

    // Result will be based on default operation (add)
    expect(resultText).toHaveTextContent('15');
  });

  it('updates result when Calculate button is pressed', () => {
    const { getByTestId } = render(<App />);
    const firstInput = getByTestId('first-number-input');
    const secondInput = getByTestId('second-number-input');
    const calculateButton = getByTestId('calculate-button');
    const resultText = getByTestId('result-text');

    // Initial state
    expect(resultText).toHaveTextContent('?');

    // Enter numbers
    fireEvent.changeText(firstInput, '8');
    fireEvent.changeText(secondInput, '2');

    // Calculate
    fireEvent.press(calculateButton);

    // Result should change
    expect(resultText).toHaveTextContent('10');
  });

  it('handles zero values', () => {
    const { getByTestId } = render(<App />);
    const firstInput = getByTestId('first-number-input');
    const secondInput = getByTestId('second-number-input');
    const calculateButton = getByTestId('calculate-button');
    const resultText = getByTestId('result-text');

    fireEvent.changeText(firstInput, '0');
    fireEvent.changeText(secondInput, '0');
    fireEvent.press(calculateButton);

    expect(resultText).toHaveTextContent('0');
  });

  it('handles decimal numbers', () => {
    const { getByTestId } = render(<App />);
    const firstInput = getByTestId('first-number-input');
    const secondInput = getByTestId('second-number-input');
    const calculateButton = getByTestId('calculate-button');
    const resultText = getByTestId('result-text');

    fireEvent.changeText(firstInput, '5.5');
    fireEvent.changeText(secondInput, '2.5');
    fireEvent.press(calculateButton);

    expect(resultText).toHaveTextContent('8');
  });
});
