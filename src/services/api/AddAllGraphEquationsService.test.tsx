/* eslint-env jest */
import AddAllGraphEquationsService from './AddAllGraphEquationsService';
import type FunctionInterface from '../../interfaces/FunctionInterface';
import LineStyleEnum from '../../enum/LineStyleEnum';

describe('AddAllGraphEquationsService', () => {
	const mockFetch = jest.fn();

	beforeEach(() => {
		global.fetch = mockFetch;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should add all equations successfully', async () => {
		const equations: FunctionInterface[] = [
			{
				equation: 'y = x',
				index: 0,
				color: '#000000',
				lineStyle: LineStyleEnum.SOLID,
			},
			{
				equation: 'y = x + 1',
				index: 1,
				color: '#ff0000',
				lineStyle: LineStyleEnum.SOLID,
			},
			{
				equation: 'y = x - 1',
				index: 2,
				color: '#00ff00',
				lineStyle: LineStyleEnum.DOTTED,
			},
		];
		const graphNumber = 1;

		await AddAllGraphEquationsService(equations, graphNumber);

		expect(mockFetch).toHaveBeenCalledTimes(3);
	});
});
