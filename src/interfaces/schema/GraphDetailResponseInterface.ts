import type GraphInterface from './GraphObjectInterface';

interface GraphDetailResponse {
	status: number;
	message: string;
	data: GraphInterface;
}
export default GraphDetailResponse;
