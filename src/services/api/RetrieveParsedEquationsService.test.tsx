/* eslint-env jest */
import RetrieveParsedEquationsService from './RetrieveParsedEquationsService';
import { isErrorResponseInterface } from '../../interfaces/response/ErrorResponseInterface';

jest.mock('./RetrieveParsedEquationsService');

describe('Test Retrieve Parsed Equation Service', () => {
	test('Test receive 200 response', async () => {
		RetrieveParsedEquationsService(['2x'])
			.then((response) => {
				expect(response).not.toBeUndefined();
				if (response != null) {
					expect(response.status).toBe(200);
					if (!isErrorResponseInterface(response)) {
						expect(response.data.parsed_expressions).toEqual(['x^2']);
					} else {
						expect(response.data).toBeUndefined();
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});
	});

	test('Test receive 400 response', async () => {
		RetrieveParsedEquationsService(['x^2', '2x+3'])
			.then((response) => {
				expect(response).not.toBeUndefined();
				if (response != null) {
					expect(response.status).toBe(400);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	});
});
