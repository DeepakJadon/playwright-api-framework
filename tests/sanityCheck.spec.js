// tests/sanityCheck.spec.js
const { test, expect } = require('@playwright/test');

test.skip('Sanity check test', async () => {
    expect(1 + 1).toBe(2);
});
