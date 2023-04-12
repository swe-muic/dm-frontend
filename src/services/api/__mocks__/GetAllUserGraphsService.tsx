/* eslint-env jest */
import type GraphInterface from '../../../interface/schema/GraphObjectInterface';

const mockedGraphs: GraphInterface[] = [
	{
		id: 1,
		name: 'sample_graph',
		preview: 'minio_bucket_name',
		owner: 1,
		created: '2023-04-12T02:07:26.256Z',
		updated: '2023-04-12T02:07:26.256Z',
	},
	{
		id: 1,
		name: 'sample_graph_2',
		preview: 'minio_bucket_name',
		owner: 2,
		created: '2023-04-12T02:07:26.256Z',
		updated: '2023-04-12T02:07:26.256Z',
	},
];

const GetAllUserGraphs = jest
	.fn()
	.mockImplementation(
		async (ownerId: number) => await Promise.resolve(mockedGraphs.filter((graph) => Number(graph.owner) === ownerId)),
	);

export default GetAllUserGraphs;
