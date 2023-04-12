/* eslint-env jest */
import GraphExists from './CheckGraphExistsService';

global.fetch = jest.fn().mockResolvedValue(async () => true);

describe.skip('check if graph exists', () => {
	it('should return a Promise', () => {
		const result = GraphExists(1);
		expect(result).toBeInstanceOf(Promise);
	});

	it('should return an false if doesnt find the graph id', async () => {
		const exists = await GraphExists(-1);
		expect(exists).toEqual(false);
	});
});
