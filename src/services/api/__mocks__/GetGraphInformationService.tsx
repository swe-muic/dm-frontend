/* eslint-env jest */

import type ErrorResponseInterface from '@/interfaces/response/ErrorResponseInterface';
import type SingleGraphResponseInterface from '@/interfaces/response/SingleGraphResponseInterface';

const mockGraphGraphResponse: Array<SingleGraphResponseInterface | ErrorResponseInterface> = [
	{
		status: 200,
		message: 'OK',
		data: {
			id: 1,
			name: 'mock graph',
			preview: 'minio_bucket_name',
			owner: '1',
			created: '2023-04-12T02:07:26.256Z',
			updated: '2023-04-12T02:07:26.256Z',
		},
	},
	{
		status: 400,
		message: 'Bad Request',
		data: {
			detail: 'Invalid graph id',
		},
	},
];

const GetGraphInformation = jest.fn(async (graph: number) =>
	graph === 1 ? mockGraphGraphResponse[0] : mockGraphGraphResponse[1],
);

export default GetGraphInformation;
