/* eslint-env jest */
import DeleteAllGraphEquationsService from './DeleteAllGraphEquationsService';

jest.mock('../../services/api/GetAllGraphEquationsService', () =>
	jest.fn().mockResolvedValue([
		{
			id: 2,
			equation: 'x + x = 0',
			parsed_equation: 'x = 0',
			color: 1,
			line_style: '--',
			line_width: 1,
			graph: 1,
		},
		{
			id: 1,
			equation: 'x + x = 0',
			parsed_equation: 'x = 0',
			color: 1,
			line_style: '--',
			line_width: 1,
			graph: 2,
		},
	]),
);

describe('AddAllGraphEquationsService', () => {
	const mockFetch = jest.fn();

	beforeEach(() => {
		global.fetch = mockFetch;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should add all equations successfully', async () => {
		const graphNumber = 1;

		await DeleteAllGraphEquationsService(graphNumber);

		expect(mockFetch).toHaveBeenCalledTimes(2);
	});
});
