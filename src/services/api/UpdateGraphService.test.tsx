/* eslint-env jest */
import UpdateGraph from './UpdateGraphService';
import { BASE_URL } from '../../config/Constants';

const mockResponse = {
	status: 200,
	message: 'success',
	data: {
		id: 1,
		name: 'sample_graph',
		preview: 'minio_bucket_name',
		owner: '1',
		created: '2023-04-12T14:43:45.905Z',
		updated: '2023-04-12T14:43:45.905Z',
	},
};

beforeEach(() => {
	global.fetch = jest.fn().mockResolvedValue({
		ok: true,
		json: jest.fn().mockResolvedValue(mockResponse),
	});
});

afterEach(() => {
	jest.resetAllMocks();
});

describe('UpdateGraph', () => {
	it('should update a graph successfully', async () => {
		const buttonText = 'new_graph_name';
		const graphId = 1;
		const ownerId = '1';
		const preview = 'minio_bucket_name';
		const result = await UpdateGraph(buttonText, graphId, ownerId, preview);

		expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/api/viewset/graphs/${graphId}/`, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: buttonText,
				preview,
				updated: new Date().toDateString(),
				owner: ownerId,
			}),
		});
		expect(result).toBe(true);
	});

	it('should return false if the response is not ok', async () => {
		const errorResponse = {
			status: 400,
			message: 'Bad Request',
			data: {},
		};
		global.fetch = jest.fn().mockResolvedValue({
			ok: false,
			json: jest.fn().mockResolvedValue(errorResponse),
		});

		const result = await UpdateGraph('graph_name', 1, '1', 'minio_bucket_name');
		expect(result).toBe(false);
	});

	it('should return false if there is an error', async () => {
		global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

		const result = await UpdateGraph('graph_name', 1, '1', 'minio_bucket_name');

		expect(result).toBe(false);
	});
});
