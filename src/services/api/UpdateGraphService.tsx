import { BASE_URL } from '../../config/Constants';
import type GraphValidationErrorResponse from '../../interfaces/response/GraphErrorResponseInterface';

const UpdateGraph = async (buttonText: string, graphId: number, ownerId: string, preview: string): Promise<boolean> => {
	try {
		const graphReq = {
			name: buttonText,
			preview,
			updated: new Date().toDateString(),
			owner: ownerId,
		};
		const response = await fetch(`${BASE_URL}/api/viewset/graphs/${graphId}/`, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(graphReq),
		});
		if (!response.ok) {
			const errorResponse: GraphValidationErrorResponse = await response.json();
			throw new Error(errorResponse.message);
		}
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
};
export default UpdateGraph;
