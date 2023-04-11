interface Graph {
	id: number;
	name: string;
	preview: string;
	owner: string;
	created: string;
	updated: string;
}

interface GraphDetailResponse {
	status: number;
	message: string;
	data: Graph;
}

interface GraphValidationErrorResponse {
	status: number;
	message: string;
	data: Graph;
}

const UpdateGraph = async (buttonText: string, graphId: number, ownerId: string): Promise<void> => {
	const dateTimeNow = new Date();
	const graphReq = {
		name: buttonText,
		preview: 'minio_bucket_test2',
		updated: dateTimeNow.toDateString(),
		owner: ownerId,
	};
	const response = await fetch(`http://127.0.0.1:8000/api/viewset/graphs/${graphId}/`, {
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
	const graphDetail: GraphDetailResponse = await response.json();
	console.log(graphDetail.data);
};
export default UpdateGraph;
