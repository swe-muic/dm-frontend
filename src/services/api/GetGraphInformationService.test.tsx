/* eslint-env jest */
import GetGraphInformation from './GetGraphInformationService';
import { BASE_URL } from '../../config/Constants';

const mockResponse = {
	status: 200,
	message: 'success',
	data: {
		id: 1,
		name: 'sample_graph',
		preview: 'minio_bucket_name',
		owner: 1,
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

describe('GetGraphInformation', () => {
	it('should fetch graph information successfully', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: jest.fn().mockResolvedValue(mockResponse),
		});

		const result = await GetGraphInformation(1);

		expect(result).toEqual(mockResponse);
	});

	it('should return an error if there is an error fetching the graph information', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: false,
			json: jest.fn().mockResolvedValue({
				status: 404,
				message: 'Not Found',
				data: {},
			}),
		});

		const graphId = 1;
		const result = await GetGraphInformation(graphId);

		expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/api/viewset/graphs/${graphId}/`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		expect(result).toEqual({
			status: 404,
			message: 'Not Found',
			data: {},
		});
	});
});
