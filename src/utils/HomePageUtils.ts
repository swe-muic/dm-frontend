// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from 'mathjs';

function splitExpression(expression: string): string {
	const splittedExpression = expression.split('=');
	return splittedExpression[splittedExpression.length - 1].replace(/\s/g, '');
}

export function isPlottableHelper(fn: string, x: number): boolean {
	try {
		// Try to evaluate the function with x = 0
		// eslint-disable-next-line no-eval
		const f = parse(fn).compile();

		// Test the function at x=0
		const evaluatedF = f.evaluate({ x });
		return typeof evaluatedF === 'number' && !Number.isNaN(evaluatedF);
	} catch (error) {
		console.log(error);
		return false;
	}
}

function isPlottable(fn: string): boolean {
	const xValues = [-100, -10, -1, 0, 1, 10, 100];
	return xValues.some((x) => isPlottableHelper(fn, x));
}

export default { splitExpression, isPlottable };
