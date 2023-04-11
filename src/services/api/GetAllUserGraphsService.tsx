import { BASE_URL } from '../../config/Constants';
import type GraphInterface from '../../interface/schema/GraphObjectInterface';

interface GraphResponse {
	status: number;
	message: string;
	data: GraphInterface[];
}

/*
This function returns all of the specified user's graphs
	@param ownerId: number 
	@return Promise<GraphInterface[]> all graphs owned by the user
 */
const GetAllUserGraphs = async (ownerId: number): Promise<GraphInterface[]> => {
	const response = await fetch(`${BASE_URL}/api/viewset/graphs/`);
	const graphData: GraphResponse = await response.json();
	const filteredGraphs: GraphInterface[] = graphData.data.filter((graph) => graph.owner === ownerId);
	return filteredGraphs;
};

export default GetAllUserGraphs;
