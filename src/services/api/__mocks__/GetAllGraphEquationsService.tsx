/* eslint-env jest */
import type EquationInterface from '../../../interfaces/schema/EquationInterface';
import LineStyleEnum from '../../../enum/LineStyleEnum';

const mockedGraphs: EquationInterface[] = [
	{
		id: 1,
		equation: '2x',
		parsed_equation: '2x',
		color: 1,
		line_style: LineStyleEnum.SOLID,
		line_width: 1,
		graph: 1,
	},
	{
		id: 2,
		equation: 'x^2',
		parsed_equation: 'x^2',
		color: 2,
		line_style: LineStyleEnum.DOTTED,
		line_width: 2,
		graph: 2,
	},
];

const GetAllGraphEquations = jest.fn().mockImplementation(async (graphId: number) => {
	console.log('mockedGraphs', mockedGraphs);
	mockedGraphs.filter((equation) => equation.graph === graphId);
});

export default GetAllGraphEquations;
