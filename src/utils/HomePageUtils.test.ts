/* eslint-env jest */
import HomePageUtils, { isPlottableHelper } from './HomePageUtils';

describe('Test Utils for Home Page', () => {
	test('Test splitExpression works as intended', () => {
		const expression = 'y = 2x + 1';
		const result = HomePageUtils.splitExpression(expression);
		expect(result).toBe('2x+1');

		const expression2 = 'y = 2x + 1 = 3x + 2';
		const result2 = HomePageUtils.splitExpression(expression2);
		expect(result2).toBe('3x+2');

		const expression3 = '2 x + 1';
		const result3 = HomePageUtils.splitExpression(expression3);
		expect(result3).toBe('2x+1');
	});

	test('Test isPlottableHelper works as intended for true tests', () => {
		const fn = 'x^2';
		const xs = [-100, -10, -1, 0, 1, 10, 100];

		xs.forEach((x) => {
			const result = isPlottableHelper(fn, x);
			expect(result).toBe(true);
		});
	});

	test('Test isPlottableHelper works as intended for false tests', () => {
		const fn3 = 'i';
		const result3 = isPlottableHelper(fn3, 4);
		expect(result3).toBe(false);
	});

	test('Test isPlottableHelper correctly returns false for invalid functions', () => {
		const fn = '\\';
		const result = isPlottableHelper(fn, 4);
		expect(result).toBe(false);

		const fn2 = 'j=k+l';
		const result2 = isPlottableHelper(fn2, 4);
		expect(result2).toBe(false);
	});

	test('Test isPlottable works as intended for true tests', () => {
		const fn = 'x^2';
		const result = HomePageUtils.isPlottable(fn);
		expect(result).toBe(true);

		const fn2 = '1/x';
		const result2 = HomePageUtils.isPlottable(fn2);
		expect(result2).toBe(true);

		const fn3 = 'sin(x)';
		const result3 = HomePageUtils.isPlottable(fn3);
		expect(result3).toBe(true);
	});

	test('Test isPlottable works as intended for false tests', () => {
		const fn = 'i';
		const result = HomePageUtils.isPlottable(fn);
		expect(result).toBe(false);
	});
});
