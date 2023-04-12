import type BaseResponse from './BaseResponse';
import type BaseEquationInterface from '../schema/BaseEquationInterface';

interface ParseEquationsResponse extends BaseResponse {
	data: BaseEquationInterface;
}

export default ParseEquationsResponse;
