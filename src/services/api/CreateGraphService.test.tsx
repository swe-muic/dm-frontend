/* eslint-env jest */

import CreateGraph from './CreateGraphService';
import DeleteGraph from './DeleteGraphService';

global.fetch = jest.fn().mockResolvedValue({
	json: jest.fn().mockResolvedValue(1),
});

describe('Create a graph', () => {
	it('should return a Promise', async () => {
		try {
			const result = CreateGraph('test graph title', '1');
			expect(result).toBeInstanceOf(Promise);

			await DeleteGraph(await result);
		} catch (e) {
			expect(e).toBe('NOT FOUND');
		}
	});

	// it('should return graph id', async () => {
	// 	const result = await CreateGraph('test graph title', '1');
	// 	expect(result).toEqual();
	//
	// 	await DeleteGraph(result);
	// });

	it('should return undefined graph id, already exist', async () => {
		await CreateGraph('test graph title', '1');
		const result = await CreateGraph('test graph title', '1');
		expect(result).toEqual(-1);

		await DeleteGraph(result);
	});
});
