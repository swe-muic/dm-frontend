/* eslint-env jest */

// Mock implementation for fetch
// Import the module under test after the mock implementation
import GetAllGraphEquations from './GetAllGraphEquationsService';

global.fetch = jest.fn().mockResolvedValue({
	json: jest.fn().mockResolvedValue({
		status: 200,
		message: 'success',
		data: [
			{
				id: 1,
				equation: 'x + x = 0',
				parsed_equation: 'x = 0',
				color: 1,
				line_style: '--',
				line_width: 1,
				graph: 1,
			},
		],
	}),
});

describe('GetAllGraphEquations', () => {
	it('should return all equations for a specified graph', async () => {
		const equations = await GetAllGraphEquations(1);
		expect(equations).toEqual([
			{
				id: 1,
				equation: 'x + x = 0',
				parsed_equation: 'x = 0',
				color: 1,
				line_style: '--',
				line_width: 1,
				graph: 1,
			},
		]);
	});
});
