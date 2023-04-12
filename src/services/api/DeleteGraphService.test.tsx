/* eslint-env jest */

import DeleteGraph from './DeleteGraphService';

global.fetch = jest.fn().mockResolvedValue(undefined);

describe('Delete a graph', () => {
	it('should return a Promise', () => {
		const result = DeleteGraph(1);
		expect(result).toBeInstanceOf(Promise);
	});

	it('should return not found', async () => {
		try {
			await DeleteGraph(-1);
		} catch (e) {
			expect(e).toEqual('NOT FOUND');
		}
	});
});
