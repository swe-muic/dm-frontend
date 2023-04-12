import type GraphInterface from '../../interfaces/schema/GraphObjectInterface';

interface GraphDetailResponse {
	status: number;
	message: string;
	data: GraphInterface;
}
export default GraphDetailResponse;
