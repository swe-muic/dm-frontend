/* eslint-env jest */
import type GraphInterface from '../../../interfaces/schema/GraphObjectInterface';

const mockedGraph: GraphInterface = {
	id: 1,
	name: 'sample_graph',
	preview: 'minio_bucket_name',
	owner: '1',
	created: '2023-04-12T02:07:26.256Z',
	updated: '2023-04-12T02:07:26.256Z',
};

const GraphExists = jest.fn().mockImplementation(async (graphId: number) => graphId === mockedGraph.id);

export default GraphExists;
