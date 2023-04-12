/* eslint-env jest */

import { isErrorResponseInterface } from './ErrorResponseInterface';

describe('isErrorResponseInterface', () => {
	it('should return true for an error response', () => {
		const errorResponse = {
			status: 400,
			message: 'Bad Request',
			data: {
				detail: 'Invalid request parameters',
			},
		};
		expect(isErrorResponseInterface(errorResponse)).toBe(true);
	});

	it('should return false for a non-error response', () => {
		const nonErrorResponse = {
			status: 200,
			message: 'OK',
			data: {
				result: 'success',
			},
		};
		expect(isErrorResponseInterface(nonErrorResponse)).toBe(false);
	});

	it('should return true', () => {
		const nonErrorResponse = {
			status: 200,
			message: 'OK',
			data: {
				something: 'wow',
				detail: 'something',
			},
		};
		expect(isErrorResponseInterface(nonErrorResponse)).toBe(true);
	});
});
