/* eslint-env jest */
import type GraphInterface from '../../../interfaces/schema/GraphObjectInterface';
// import type GraphDetailResponse from '../../../interfaces/schema/GraphDetailResponseInterface';
// import type NotFoundErrorResponse from '../../../interfaces/schema/GraphNotFoundErrorResponseInterface';

const mockedGraph: GraphInterface = {
	id: 1,
	name: 'sample_graph',
	preview: 'minio_bucket_name',
	owner: 1,
	created: '2023-04-12T02:07:26.256Z',
	updated: '2023-04-12T02:07:26.256Z',
};

// const mockedGraphDetailResponse: GraphDetailResponse = {
// 	status: 200,
// 	message: 'OK',
// 	data: mockedGraph,
// };
//
// const mockedGraphNotFoundErrorResponse: NotFoundErrorResponse = {
// 	status: 404,
// 	message: 'NOT FOUND',
// 	data: 'NOT FOUND',
// };

const GraphExists = jest.fn().mockImplementation(async (graphId: number) => graphId === mockedGraph.id);

export default GraphExists;
