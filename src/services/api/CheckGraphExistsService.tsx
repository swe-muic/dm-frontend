import { BASE_URL } from '../../config/Constants';

const GraphExists = async (graphId: number): Promise<boolean> => {
	try {
		const response = await fetch(`${BASE_URL}/api/viewset/graphs/${graphId}/`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.status === 200) {
			return true; // Graph exists
		} else if (response.status === 404) {
			return false; // Graph does not exist
		}
		console.log(response);
	} catch (e) {
		console.log(e);
	}
	return false;
};

export default GraphExists;