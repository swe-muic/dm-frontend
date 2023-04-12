import { BASE_URL } from '../../config/Constants';
import type GraphValidationErrorResponse from '../../interfaces/schema/GraphErrorResponseInterface';

const UpdateGraph = async (buttonText: string, graphId: number, ownerId: string): Promise<void> => {
	try {
		const graphReq = {
			name: buttonText,
			preview: 'minio_bucket_test2',
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
	} catch (e) {
		console.log(e);
	}
};
export default UpdateGraph;
