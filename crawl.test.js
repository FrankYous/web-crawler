const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')
const { getURLsFromHTML } = require('./crawl.js')


describe('normalizing the URL', () => {
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

    test('URL normalization - all cases combined', () => {
        expect(normalizeURL('http://www.gNu.Org/foo/bar/')).toBe('www.gnu.org/foo/bar');
    });
})

describe('extracting URLs from HTML', () => {
    test('changes relative URL to absolute url', () => {
        expect(getURLsFromHTML(
            `<div class="btn-left">
            <a href="/distros/free-distros.html">Try GNU/Linux</a></div>
            <div style="clear:both"></div>`,
            'https://www.gnu.org'
        )).toEqual(['https://www.gnu.org/distros/free-distros.html']);
    })

    test('returns external URLs unchanged', () => {
        expect(getURLsFromHTML(
            `<div class="btn-right">... or <a
            href="https://directory.fsf.org/wiki/Free_Software_Directory:Free_software_replacements">
            Try parts of GNU</a></div>`,
            'https://www.gnu.org'
        )).toEqual(['https://directory.fsf.org/wiki/Free_Software_Directory:Free_software_replacements'])
    })

    test('extracts URLs from HTML - combined case', () => {
        expect(getURLsFromHTML(
            `<div class="btn-right">... or <a
            href="https://directory.fsf.org/wiki/Free_Software_Directory:Free_software_replacements">
            Try parts of GNU</a></div>
            <div style="clear:both"></div>
            
            <h2>What is the Free Software Movement?</h2>
            
            <p>The free software movement campaigns to win for the users of
            computing the freedom that comes from free software.  Free software
            puts its users in control of their own computing.  Nonfree software
            puts its users under the power of the software's developer.  See
            <a href="/audio-video/philosophy-recordings.html#rms-201404070">
            the video explanation</a>.</p>`,
            'https://www.gnu.org'
        )).toEqual(['https://directory.fsf.org/wiki/Free_Software_Directory:Free_software_replacements',
        'https://www.gnu.org/audio-video/philosophy-recordings.html#rms-201404070'])
    })
})