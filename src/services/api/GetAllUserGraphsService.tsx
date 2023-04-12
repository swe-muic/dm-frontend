import { BASE_URL } from '../../config/Constants';
import type GraphInterface from '../../interfaces/schema/GraphObjectInterface';
import type GraphResponseInterface from '../../interfaces/response/GraphResponseInterface';

/*
This function returns all of the specified user's graphs
	@param ownerId: number 
	@return Promise<GraphInterface[]> all graphs owned by the user
 */
const GetAllUserGraphs = async (ownerId: string): Promise<GraphInterface[]> => {
	const response = await fetch(`${BASE_URL}/api/viewset/graphs/`);
	const graphData: GraphResponseInterface = await response.json();
	return graphData.data.filter((graph) => graph.owner === ownerId);
};

export default GetAllUserGraphs;
