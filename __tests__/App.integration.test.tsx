/**
 * @format
 * Integration tests - Testing App with real calculate function
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

// NO MOCKING - using real calculate function

describe('App Component - Integration Tests', () => {
  it('calculates addition with real calculate function', () => {
    const { getByTestId } = render(<App />);
    const firstInput = getByTestId('first-number-input');
    const secondInput = getByTestId('second-number-input');
    const calculateButton = getByTestId('calculate-button');
    const resultText = getByTestId('result-text');

    fireEvent.changeText(firstInput, '10');
    fireEvent.changeText(secondInput, '5');
    fireEvent.press(calculateButton);

    // Real calculation happens here
    expect(resultText).toHaveTextContent('15');
  });

  it('calculates multiplication with real calculate function', () => {
    const { getByTestId } = render(<App />);
    const firstInput = getByTestId('first-number-input');
    const secondInput = getByTestId('second-number-input');
    const picker = getByTestId('operation-picker');
    const calculateButton = getByTestId('calculate-button');
    const resultText = getByTestId('result-text');

    fireEvent.changeText(firstInput, '6');
    fireEvent.changeText(secondInput, '7');

    // Change operation to multiply
    fireEvent(picker, 'onValueChange', 'multiply');

    fireEvent.press(calculateButton);

    // Real calculation: 6 * 7 = 42
    expect(resultText).toHaveTextContent('42');
  });

  it('handles division by zero with real calculate function', () => {
    const { getByTestId } = render(<App />);
    const firstInput = getByTestId('first-number-input');
    const secondInput = getByTestId('second-number-input');
    const picker = getByTestId('operation-picker');
    const calculateButton = getByTestId('calculate-button');
    const resultText = getByTestId('result-text');

    fireEvent.changeText(firstInput, '10');
    fireEvent.changeText(secondInput, '0');
    fireEvent(picker, 'onValueChange', 'divide');
    fireEvent.press(calculateButton);

    // Real division by zero results in Infinity
    expect(resultText).toHaveTextContent('Infinity');
  });

  it('performs complete user workflow', () => {
    const { getByTestId } = render(<App />);
    const firstInput = getByTestId('first-number-input');
    const secondInput = getByTestId('second-number-input');
    const picker = getByTestId('operation-picker');
    const calculateButton = getByTestId('calculate-button');
    const clearButton = getByTestId('clear-button');
    const resultText = getByTestId('result-text');

    // Step 1: Calculate addition
    fireEvent.changeText(firstInput, '5');
    fireEvent.changeText(secondInput, '3');
    fireEvent.press(calculateButton);
    expect(resultText).toHaveTextContent('8');

    // Step 2: Clear and calculate subtraction
    fireEvent.press(clearButton);
    expect(resultText).toHaveTextContent('?');

    fireEvent.changeText(firstInput, '10');
    fireEvent.changeText(secondInput, '4');
    fireEvent(picker, 'onValueChange', 'subtract');
    fireEvent.press(calculateButton);
    expect(resultText).toHaveTextContent('6');
  });
});
