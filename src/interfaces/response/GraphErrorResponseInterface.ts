import type GraphInterface from '../../interfaces/schema/GraphObjectInterface';

interface GraphValidationErrorResponse {
	status: number;
	message: string;
	data: GraphInterface;
}

export default GraphValidationErrorResponse;
