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
		return response.ok;
	} catch (e) {
		console.log(e);
		return false;
	}
};

export default GraphExists;
