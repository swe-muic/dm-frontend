/* eslint-env jest */

import DeleteGraph from './DeleteGraphService';

describe('Delete a graph', () => {
	it('should return a Promise', () => {
		const result = DeleteGraph(1);
		expect(result).toBeInstanceOf(Promise);
	});

	it('should throw an error if the response is not OK', async () => {
		global.fetch = jest.fn().mockResolvedValue({ ok: false });

		try {
			await DeleteGraph(1);
		} catch (e) {
			expect(e).toEqual(new Error('NOT FOUND'));
			expect.assertions(1);
		}
	});

	it('should be OK', async () => {
		global.fetch = jest.fn().mockResolvedValue({ ok: true });
		await DeleteGraph(1);
		expect.assertions(0);
	});
});
