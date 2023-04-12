/* eslint-env jest */
import type ParseEquationsResponse from '../../../interfaces/response/ParsedEquationsResponse';
import type ErrorResponseInterface from '../../../interfaces/response/ErrorResponseInterface';
// eslint-disable-next-line no-duplicate-imports
import { isErrorResponseInterface } from '../../../interfaces/response/ErrorResponseInterface';

const mockParsedResponse: Array<ParseEquationsResponse | ErrorResponseInterface> = [
	{
		status: 200,
		message: 'OK',
		data: {
			parsed_expressions: ['x^2'],
			expressions: ['2x'],
		},
	},
	{
		status: 400,
		message: 'Bad Request',
		data: {
			detail: 'Invalid expression: x^$2$',
		},
	},
];

const ParseAllEquations = jest.fn().mockImplementation(async (equations: string[]) =>
	mockParsedResponse.filter(async (response) => {
		if (!isErrorResponseInterface(response) && response.data.expressions === equations) {
			return mockParsedResponse.filter(
				(response) => !isErrorResponseInterface(response) && response.data.expressions === equations,
			)[0];
		}
		return mockParsedResponse[1];
	}),
);

export default ParseAllEquations;
