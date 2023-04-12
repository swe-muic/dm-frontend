import type BaseResponse from '../../interfaces/response/BaseResponse';
import type GraphInterface from '../../interfaces/schema/GraphObjectInterface';

export interface GraphResponse extends BaseResponse {
	data: GraphInterface[];
}

export default GraphResponse;
