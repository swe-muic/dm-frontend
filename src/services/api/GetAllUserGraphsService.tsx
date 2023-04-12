import { BASE_URL } from '../../config/Constants';
import type BaseResponse from '../../interfaces/response/BaseResponse';
import type GraphInterface from '../../interfaces/schema/GraphObjectInterface';

interface GraphResponse extends BaseResponse {
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
	return graphData.data.filter((graph) => Number(graph.owner) === ownerId);
};

export default GetAllUserGraphs;
