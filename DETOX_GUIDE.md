# Detox E2E Testing Setup Guide

## 📦 What is Detox?

Detox is a **gray box** end-to-end testing framework for mobile apps. It tests your app on a real device/simulator, allowing you to verify the complete user experience.

## ✅ Setup Complete

Your project now has:

- ✅ Detox installed
- ✅ Configuration files created
- ✅ E2E test examples
- ✅ NPM scripts added

## 📁 File Structure

```
RNTesting/
├── e2e/
│   ├── jest.config.js       # Jest configuration for E2E tests
│   ├── global.d.ts          # TypeScript declarations for Detox
│   ├── setup.ts             # Test setup hooks
│   └── calculator.test.ts    # E2E tests for calculator app
├── .detoxrc.js              # Detox configuration
└── package.json             # Scripts added
```

## 🚀 Running E2E Tests

### Step 1: Build the app for testing

```bash
npm run build:e2e
```

### Step 2: Run the E2E tests

```bash
npm run test:e2e
```

### Run specific test

```bash
npm run test:e2e -- --grep "should calculate addition"
```

## 📝 Available Commands

| Command                                    | Description               |
| ------------------------------------------ | ------------------------- |
| `npm run build:e2e`                        | Build app for E2E testing |
| `npm run test:e2e`                         | Run all E2E tests         |
| `detox test --configuration ios.sim.debug` | Run with specific config  |

## 🧪 Test Examples

### Basic Assertions

```typescript
// Check if element is visible
await expect(element(by.id('welcome-text'))).toBeVisible();

// Check text content
await expect(element(by.id('result-text'))).toHaveText('15');

// Check if element exists
await expect(element(by.id('calculate-button'))).toExist();
```

### User Interactions

```typescript
// Type text
await element(by.id('first-number-input')).typeText('10');

// Tap button
await element(by.id('calculate-button')).tap();

// Clear text
await element(by.id('first-number-input')).clearText();

// Scroll
await element(by.id('scrollView')).scrollTo('bottom');
```

### Matchers

```typescript
// By testID
by.id('my-test-id');

// By text
by.text('Button Text');

// By label
by.label('Accessibility Label');

// By type
by.type('RCTTextInput');
```

## ⚙️ Configuration

### iOS Simulator Setup

The `.detoxrc.js` file is configured for iPhone 15 simulator. To change:

```javascript
devices: {
  simulator: {
    type: 'ios.simulator',
    device: {
      type: 'iPhone 14',  // Change here
    },
  },
},
```

### Available Configurations

- `ios.sim.debug` - Debug build on simulator
- `ios.sim.release` - Release build on simulator

## 🐛 Troubleshooting

### Build fails

```bash
# Clean and rebuild
npm run clean
cd ios && pod install && cd ..
npm run build:e2e
```

### Simulator doesn't launch

```bash
# List available simulators
xcrun simctl list devices

# Boot a specific simulator
xcrun simctl boot "iPhone 15"
```

### Tests timeout

Increase timeout in `e2e/jest.config.js`:

```javascript
testTimeout: 180000,  // 3 minutes
```

### App doesn't install

```bash
# Reset simulator
xcrun simctl erase all
npm run build:e2e
```

## 🆚 Test Types Comparison

| Type            | Location                           | Tests                 | Speed     | Confidence |
| --------------- | ---------------------------------- | --------------------- | --------- | ---------- |
| **Unit**        | `__tests__/*.test.tsx`             | Component logic       | ⚡ Fast   | Low        |
| **Integration** | `__tests__/*.integration.test.tsx` | Component + Service   | 🏃 Medium | Medium     |
| **E2E (Detox)** | `e2e/*.test.ts`                    | Full app on simulator | 🐢 Slow   | ✅ High    |

## 📊 Test Strategy

```
E2E Tests (10%)        ← Critical user flows
    ↑
Integration Tests (20%) ← Feature workflows
    ↑
Unit Tests (70%)       ← Individual functions/components
```

## 🎯 Best Practices

1. **Use testID consistently** - Makes tests stable
2. **Test critical paths** - Login, checkout, etc.
3. **Keep tests independent** - Each test should work alone
4. **Use beforeEach** - Reset state between tests
5. **Avoid hardcoded waits** - Use `waitFor` instead

### Example: Proper waiting

```typescript
// ❌ Bad - arbitrary wait
await new Promise(resolve => setTimeout(resolve, 3000));

// ✅ Good - wait for condition
await waitFor(element(by.id('result-text')))
  .toHaveText('15')
  .withTimeout(5000);
```

## 📚 Additional Resources

- [Detox Documentation](https://wix.github.io/Detox/)
- [Detox API Reference](https://wix.github.io/Detox/docs/api/actions/)
- [Jest Matchers](https://wix.github.io/Detox/docs/api/matchers/)

## 🔄 CI/CD Integration

For GitHub Actions:

```yaml
- name: Build for Detox
  run: npm run build:e2e

- name: Run E2E tests
  run: npm run test:e2e
```

---

**Note**: First build will take several minutes. Subsequent builds are faster due to caching.
