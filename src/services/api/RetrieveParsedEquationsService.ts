import { BASE_URL } from '../../config/Constants';
import type BaseEquationInterface from '../../interfaces/schema/BaseEquationInterface';
import getRequestOptions from './requestOptions/GetRequestOptions';
import type BaseResponse from '../../interfaces/response/BaseResponse';
import type ErrorResponseInterface from '@/interfaces/response/ErrorResponseInterface';

interface ParseEquationsResponse extends BaseResponse {
	data: BaseEquationInterface;
}

/*
This function retrieves the parsed equations from the server
	@param equations string[] the equations to parse
	@return Promise<BaseEquationInterface[]> equations parsed into a format that can be graphed
 */
const ParseAllEquations = async (
	equations: string[],
): Promise<ParseEquationsResponse | ErrorResponseInterface | undefined> => {
	const requestOptions = getRequestOptions({ expressions: equations });
	const response = await fetch(`${BASE_URL}api/viewset/equations/parser/parse_expressions/`, requestOptions);
	return await response.json();
};

export default ParseAllEquations;
