import type GraphInterface from '../schema/GraphObjectInterface';

interface GraphValidationErrorResponse {
	status: number;
	message: string;
	data: GraphInterface;
}

export default GraphValidationErrorResponse;
