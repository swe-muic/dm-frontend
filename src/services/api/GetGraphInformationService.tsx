import { BASE_URL } from '../../config/Constants';
import type SingleGraphResponseInterface from '../../interfaces/response/SingleGraphResponseInterface';
import type ErrorResponseInterface from '../../interfaces/response/ErrorResponseInterface';

const GetGraphInformation = async (graphId: number): Promise<SingleGraphResponseInterface | ErrorResponseInterface> => {
	const response = await fetch(`${BASE_URL}/api/viewset/graphs/${graphId}/`, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return await response.json();
};

export default GetGraphInformation;
