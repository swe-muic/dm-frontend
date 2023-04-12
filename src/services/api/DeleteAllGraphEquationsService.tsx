import { BASE_URL } from '../../config/Constants';
import type EquationInterface from '../../interfaces/schema/EquationInterface';
import getRequestOptions from './requestOptions/GetRequestOptions';
import GetAllGraphEquations from '../../services/api/GetAllGraphEquationsService';

const DeleteAllGraphEquationsService = async (graphNumber: number): Promise<void> => {
	const equations: EquationInterface[] = await GetAllGraphEquations(graphNumber);
	for (const equation of equations) {
		await fetch(`${BASE_URL}/api/viewset/equations/${equation.id}/`, getRequestOptions(equation, 'DELETE'));
	}
};

export default DeleteAllGraphEquationsService;
