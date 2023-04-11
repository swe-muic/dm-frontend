const DeleteGraph = async (graphId: number): Promise<void> => {
	try {
		const response = await fetch(`http://127.0.0.1:8000/api/viewset/graphs/${graphId}/`, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			const errorResponse = await response.json();
			throw new Error(errorResponse.message);
		}
		console.log(response.json());
	} catch (e) {
		console.log(e);
	}
};

export default DeleteGraph;
