const { test, expect } = require('@jest/globals')
const { sortDict } = require('./sort.js')

describe ('testing sorting function', () => {
    test('already sorted object', () => {
        expect(sortDict({'apple':10, 'orange':7, 'banana':4, 'mango':1})).toEqual([['apple',10], ['orange',7], ['banana',4], ['mango',1]])
    })
    test('sorted object in reverse', () => {
        expect(sortDict({'mango':1, 'banana':4, 'orange':7, 'apple':10})).toEqual([['apple',10], ['orange',7], ['banana',4], ['mango',1]])
    })
    test('unsored objects', () => {
        expect(sortDict({'orange':7, 'apple':10, 'mango':1, 'banana':4})).toEqual([['apple',10], ['orange',7], ['banana',4], ['mango',1]])
    })
})