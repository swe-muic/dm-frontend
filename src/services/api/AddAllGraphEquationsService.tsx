import { BASE_URL } from '../../config/Constants';
import type FunctionInterface from '../../interfaces/FunctionInterface';
import type EquationInterface from '../../interfaces/schema/EquationInterface';
// eslint-disable-next-line no-duplicate-imports
import { mapFromFunctionInterface } from '../../interfaces/schema/EquationInterface';
import getRequestOptions from './requestOptions/GetRequestOptions';

const AddAllGraphEquationsService = async (equations: FunctionInterface[], graphNumber: number): Promise<void> => {
	const equationBody: EquationInterface[] = equations.map((equation) =>
		mapFromFunctionInterface(equation, -1, graphNumber),
	);
	for (const equation of equationBody) {
		await fetch(`${BASE_URL}/api/viewset/equations/`, getRequestOptions(equation));
	}
};

export default AddAllGraphEquationsService;
