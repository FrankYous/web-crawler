const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')


test('removes the protocol', () => {
    expect(normalizeURL('http://www.gnu.org')).toBe('www.gnu.org');
});

test('lowercases all letters', () => {
    expect(normalizeURL('https://www.GNU.org')).toBe('www.gnu.org');
});

test('removes the slash at the end of hostname', () => {
    expect(normalizeURL('https://www.gnu.org/')).toBe('www.gnu.org');
});

test('removes the slash at the end of pathname', () => {
    expect(normalizeURL('https://www.gnu.org/foo/bar/')).toBe('www.gnu.org/foo/bar');
});

test('all cases combined', () => {
    expect(normalizeURL('http://www.gNu.Org/foo/bar/')).toBe('www.gnu.org/foo/bar');
});
