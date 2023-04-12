import type GraphInterface from './GraphObjectInterface';

interface GraphValidationErrorResponse {
	status: number;
	message: string;
	data: GraphInterface;
}

export default GraphValidationErrorResponse;
