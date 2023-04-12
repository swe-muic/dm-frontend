/* eslint-env jest */

// Mock implementation for fetch
// Import the module under test after the mock implementation
import GetAllUserGraphs from './GetAllUserGraphsService';

global.fetch = jest.fn().mockResolvedValue({
	json: jest.fn().mockResolvedValue({
		status: 200,
		message: 'Success',
		data: [
			{
				id: 1,
				name: 'sample_graph',
				preview: 'minio_bucket_name',
				owner: 1,
				created: '2023-04-12T02:07:26.256Z',
				updated: '2023-04-12T02:07:26.256Z',
			},
		],
	}),
});

// Tests for GetAllUserGraphs
describe('GetAllUserGraphs', () => {
	it('should return a Promise', () => {
		const result = GetAllUserGraphs(1);
		expect(result).toBeInstanceOf(Promise);
	});

	it('should return an array of graphs', async () => {
		const userGraphs = await GetAllUserGraphs(1);
		expect(userGraphs).toEqual([
			{
				id: 1,
				name: 'sample_graph',
				preview: 'minio_bucket_name',
				owner: 1,
				created: '2023-04-12T02:07:26.256Z',
				updated: '2023-04-12T02:07:26.256Z',
			},
		]);
	});
});
