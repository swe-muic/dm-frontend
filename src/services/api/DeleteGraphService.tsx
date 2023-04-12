import { BASE_URL } from '../../config/Constants';

const DeleteGraph = async (graphId: number): Promise<void> => {
	try {
		const response = await fetch(`${BASE_URL}/api/viewset/graphs/${graphId}/`, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			// const errorMessage = await response.json();
			throw new Error('NOT FOUND');
		}
	} catch (e) {
		console.log(e);
	}
};

export default DeleteGraph;
