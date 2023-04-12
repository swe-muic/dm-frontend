/* eslint-env jest */

import GetAllUserGraphs from './GetAllUserGraphsService';

jest.mock('./GetAllUserGraphsService');

describe('GetAllUserGraphs', () => {
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
