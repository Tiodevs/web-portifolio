// Safe server-side localStorage shim to avoid runtime errors during SSR
// Only defines a minimal API when `localStorage` is missing or doesn't implement expected methods.

if (typeof globalThis !== 'undefined') {
  try {
    const hasLS = typeof globalThis.localStorage !== 'undefined' && globalThis.localStorage;
    const valid = hasLS && typeof globalThis.localStorage.getItem === 'function';
    if (!valid) {
      // Define a no-op localStorage compatible object
      globalThis.localStorage = {
        getItem: (_key: string) => null,
        setItem: (_key: string, _value: string) => undefined,
        removeItem: (_key: string) => undefined,
        clear: () => undefined,
        length: 0,
        key: (_index: number) => null,
      };
    }
  } catch (e) {
    // If anything goes wrong, swallow to keep SSR from crashing
  }
}
