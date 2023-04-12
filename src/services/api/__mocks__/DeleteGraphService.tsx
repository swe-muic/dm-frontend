/* eslint-env jest */

const DeleteGraph = jest.fn().mockImplementation(async (graphId: number) => {
	await Promise.resolve();
});

export default DeleteGraph;
