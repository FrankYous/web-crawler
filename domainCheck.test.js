const { test, expect } = require('@jest/globals')
const { domainIsSame } = require('./domainCheck.js')


describe('checking urls have the same domain', () =>{
    test('compares domain names with different subdomains', () => {
        expect (domainIsSame('https://www.bar.com','https://foo.bar.com')).toBeFalsy()
    })
    test('compares identical domains', () =>{
        expect (domainIsSame('https://gnu.org','https://gnu.org/foo/bar/')).toBeTruthy()
    })
    test('compares different domains', ()=> {
        expect (domainIsSame('https://gnu.org','https://fsf.org')).toBeFalsy()
    })
})
