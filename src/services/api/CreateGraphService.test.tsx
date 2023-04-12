/* eslint-env jest */

import CreateGraph from './CreateGraphService';
import DeleteGraph from './DeleteGraphService';

describe('Create a graph', () => {
	beforeEach(() => {
		global.fetch = jest.fn().mockResolvedValue({
			json: jest.fn().mockResolvedValue(1),
		});
	});

	it('should return a Promise', async () => {
		try {
			const result = CreateGraph('test graph title', '1');
			expect(result).toBeInstanceOf(Promise);

			await DeleteGraph(await result);
		} catch (e) {
			expect(e).toBe('NOT FOUND');
		}
	});

	it('should return graph id', async () => {
		const passedResult = {
			ok: true,
			json: jest.fn().mockResolvedValue({
				data: {
					id: 2,
				},
			}),
		};

		global.fetch = jest.fn().mockResolvedValue(passedResult);

		const result = await CreateGraph('test graph title', '2');
		expect(result).toEqual(2);

		await DeleteGraph(result);
	});

	it('should return undefined graph id, already exist', async () => {
		await CreateGraph('test graph title', '1');
		const result = await CreateGraph('test graph title', '1');
		expect(result).toEqual(-1);

		await DeleteGraph(result);
	});
});
