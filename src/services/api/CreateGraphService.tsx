import { BASE_URL } from '../../config/Constants';
import type GraphDetailResponse from '../../interfaces/response/GraphDetailResponseInterface';
import type GraphValidationErrorResponse from '../../interfaces/response/GraphErrorResponseInterface';

const CreateGraph = async (buttonText: string, ownerId: string): Promise<number> => {
	const graphReq = {
		name: buttonText,
		preview: 'minio_bucket_test',
		owner: ownerId,
	};
	const response = await fetch(`${BASE_URL}/api/viewset/graphs/`, {
		method: 'POST',
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
	const graphDetail: GraphDetailResponse = await response.json();
	return graphDetail.data.id;
};

export default CreateGraph;
