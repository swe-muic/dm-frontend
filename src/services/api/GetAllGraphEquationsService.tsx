import { BASE_URL } from '../../config/Constants';
import type EquationResponseInterface from '../../interfaces/response/EquationResponseInterface';
import type EquationInterface from '../../interfaces/schema/EquationInterface';

/*
This function returns all of the specified graph's equations
	@param graphId: number
	@return Promise<Equation[]> all equations owned in a graph
 */
const GetAllGraphEquations = async (graphId: number): Promise<EquationInterface[]> => {
	const response = await fetch(`${BASE_URL}/api/viewset/equations/`);
	const equationData: EquationResponseInterface = await response.json();
	return equationData.data.filter((equation) => Number(equation.graph) === graphId);
};

export default GetAllGraphEquations;
