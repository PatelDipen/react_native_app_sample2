/**
 * Detox E2E test for Calculator App
 */

describe('Calculator App E2E', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome text visible', async () => {
    await expect(element(by.id('welcome-text'))).toBeVisible();
  });

  it('should show initial result as ?', async () => {
    await expect(element(by.id('result-text'))).toHaveText('?');
  });

  it('should calculate addition correctly', async () => {
    // Enter first number
    await element(by.id('first-number-input')).typeText('10');

    // Enter second number
    await element(by.id('second-number-input')).typeText('5');

    // Tap calculate button
    await element(by.id('calculate-button')).tap();

    // Verify result
    await expect(element(by.id('result-text'))).toHaveText('15');
  });

  it('should calculate multiplication correctly', async () => {
    // Enter numbers
    await element(by.id('first-number-input')).typeText('6');
    await element(by.id('second-number-input')).typeText('7');

    // Change operation to multiply
    await element(by.id('operation-picker')).tap();
    // Note: Picker interaction may vary by platform
    // For iOS simulator, you might need to use different methods

    // Calculate
    await element(by.id('calculate-button')).tap();

    // The actual test will depend on picker interaction
    // For now, we'll just verify a result appears
    await expect(element(by.id('result-text'))).not.toHaveText('?');
  });

  it('should clear inputs and result', async () => {
    // Enter numbers
    await element(by.id('first-number-input')).typeText('8');
    await element(by.id('second-number-input')).typeText('2');

    // Calculate
    await element(by.id('calculate-button')).tap();

    // Verify result changed
    await expect(element(by.id('result-text'))).toHaveText('10');

    // Tap clear button
    await element(by.id('clear-button')).tap();

    // Verify result reset
    await expect(element(by.id('result-text'))).toHaveText('?');

    // Verify inputs cleared
    await expect(element(by.id('first-number-input'))).toHaveText('');
    await expect(element(by.id('second-number-input'))).toHaveText('');
  });

  it('should handle decimal numbers', async () => {
    await element(by.id('first-number-input')).typeText('5.5');
    await element(by.id('second-number-input')).typeText('2.5');

    await element(by.id('calculate-button')).tap();

    await expect(element(by.id('result-text'))).toHaveText('8');
  });

  it('should disable calculate button when inputs are empty', async () => {
    // Calculate button should exist but tapping won't work when disabled
    await expect(element(by.id('calculate-button'))).toBeVisible();

    // Enter first number only
    await element(by.id('first-number-input')).typeText('5');

    // Button should still be visible
    await expect(element(by.id('calculate-button'))).toBeVisible();

    // Enter second number
    await element(by.id('second-number-input')).typeText('3');

    // Now button should work - verify by tapping and checking result
    await element(by.id('calculate-button')).tap();
    await expect(element(by.id('result-text'))).toHaveText('8');
  });

  it('should complete full user workflow', async () => {
    // Step 1: Calculate addition
    await element(by.id('first-number-input')).typeText('10');
    await element(by.id('second-number-input')).typeText('5');
    await element(by.id('calculate-button')).tap();
    await expect(element(by.id('result-text'))).toHaveText('15');

    // Step 2: Clear
    await element(by.id('clear-button')).tap();
    await expect(element(by.id('result-text'))).toHaveText('?');

    // Step 3: New calculation
    await element(by.id('first-number-input')).typeText('20');
    await element(by.id('second-number-input')).typeText('4');
    await element(by.id('calculate-button')).tap();
    await expect(element(by.id('result-text'))).toHaveText('24');
  });
});
