/* eslint-env jest */
import type ParseEquationsResponse from '../../../interfaces/response/ParsedEquationsResponse';
import type ErrorResponseInterface from '../../../interfaces/response/ErrorResponseInterface';

const mockParsedResponse: Array<ParseEquationsResponse | ErrorResponseInterface> = [
	{
		status: 200,
		message: 'OK',
		data: {
			parsed_expressions: ['2x'],
			expressions: ['2x'],
		},
	},
	{
		status: 400,
		message: 'Bad Request',
		data: {
			detail: 'Invalid expression',
		},
	},
];

const ParseAllEquations = jest.fn(async (equations: string[]) =>
	equations.length === 1 && equations[0] === '2x' ? mockParsedResponse[0] : mockParsedResponse[1],
);

export default ParseAllEquations;
