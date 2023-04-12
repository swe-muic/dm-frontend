/* eslint-env jest */
import RetrieveParsedEquationsService from './RetrieveParsedEquationsService';
import type ErrorResponseInterface from '@/interfaces/response/ErrorResponseInterface';

const mockResults = {
	status: 200,
	message: 'success',
	data: {
		expressions: ['x^2'],
		parsed_expressions: ['2x'],
	},
};

global.fetch = jest.fn().mockResolvedValue({
	json: jest.fn().mockResolvedValue(mockResults),
});

describe('Test Retrieve Parsed Equation Service', () => {
	it('should return a Promise', () => {
		const result = RetrieveParsedEquationsService(['x^2']);
		expect(result).toBeInstanceOf(Promise);
	});

	it('should return an array of graphs', async () => {
		const userGraphs = await RetrieveParsedEquationsService(['x^2']);
		expect(userGraphs).toEqual(mockResults);
	});

	it('should return error response when failed', async () => {
		const failedResults: ErrorResponseInterface = {
			status: 400,
			message: 'Bad Request',
			data: {
				detail: 'Invalid expression',
			},
		};
		global.fetch = jest.fn().mockResolvedValue({
			json: jest.fn().mockResolvedValue(failedResults),
		});
		const userGraphs = await RetrieveParsedEquationsService(['x^2']);
		expect(userGraphs).toEqual(failedResults);
	});
});
