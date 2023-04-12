import type BaseResponse from '../../interfaces/response/BaseResponse';
import type EquationInterface from '../../interfaces/schema/EquationInterface';

export interface EquationResponse extends BaseResponse {
	data: EquationInterface[];
}

export default EquationResponse;
