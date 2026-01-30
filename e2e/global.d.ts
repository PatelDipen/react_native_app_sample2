/// <reference types="detox" />

declare global {
  const device: Detox.Device;
  const element: Detox.Element;
  const expect: Detox.Expect<Detox.Expect>;
  const waitFor: Detox.WaitFor;
  const by: Detox.Matchers;
}

export {};
