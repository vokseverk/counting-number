import { CountingNumber } from '../../src/counting-number.js'

describe('getDecimalCount', function() {
	describe('integers', function() {
		it('reports no decimals for integers', function() {
			expect(CountingNumber.getDecimalCount(200)).toBe(0)
			expect(CountingNumber.getDecimalCount('686')).toBe(0)
			expect(CountingNumber.getDecimalCount(0)).toBe(0)
			expect(CountingNumber.getDecimalCount(-203002)).toBe(0)
		})
	})

	describe('floating point numbers', function() {
		it('reports 2 decimals for a number with 2 decimals', function() {
			expect(CountingNumber.getDecimalCount(23.05)).toBe(2)
			expect(CountingNumber.getDecimalCount(2303.59)).toBe(2)
			expect(CountingNumber.getDecimalCount('5373.25')).toBe(2)
		})

		it('even if they are zeros, they should be counted', function() {
			expect(CountingNumber.getDecimalCount(123.00)).toBe(2)
		})
	})

	describe('strings', function() {
		it('detects numbers as strings', function() {
			expect(CountingNumber.getDecimalCount('1234.356')).toBe(3)
		})

		it('detects comma as decimal separator', function() {
			expect(CountingNumber.getDecimalCount('1234,6')).toBe(1)
		})
	})
})
