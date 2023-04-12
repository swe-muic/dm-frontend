import type GraphInterface from '../schema/GraphObjectInterface';

interface GraphDetailResponse {
	status: number;
	message: string;
	data: GraphInterface;
}
export default GraphDetailResponse;
