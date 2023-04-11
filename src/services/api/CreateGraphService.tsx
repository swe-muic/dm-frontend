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

const createGraph = async (buttonText: string, ownerId: string): Promise<number> => {
	const graphReq = {
		name: buttonText,
		preview: 'minio_bucket_test',
		owner: ownerId, // auth.currentUser?.uid
	};
	const response = await fetch('http://127.0.0.1:8000/api/viewset/graphs/', {
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
	// setGid(graphDetail.data.id);
	console.log(graphDetail.data);
	return graphDetail.data.id;
};

export default createGraph;
