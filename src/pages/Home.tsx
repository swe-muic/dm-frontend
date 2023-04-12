import React, { useState } from 'react';
import Plot from '../components/Graph/GraphComponent';
import Navbar from '../components/NavBar/NavBar';
import type FunctionInterface from '../interfaces/FunctionInterface';
import { type FunctionPlotDatum } from 'function-plot/dist/types';
import LineStyleEnum from '../enum/LineStyleEnum';
import RetrieveParsedEquationsService from '../services/api/RetrieveParsedEquationsService';
import { isErrorResponseInterface } from '../interfaces/response/ErrorResponseInterface';
import { useSearchParams } from 'react-router-dom';
import HomePageUtils from '../utils/HomePageUtils';

const Home: React.FunctionComponent = () => {
	const [equations, setEquations] = useState<FunctionInterface[]>([]);
	const [plotData, setPlotData] = useState<FunctionPlotDatum[]>([]);
	const [showPlot, setShowPlot] = useState<boolean>(true);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const searchParams = useSearchParams()[0];
	const gid = Number(searchParams.get('gid')) ?? -1;
	// conver gid to number

	const newEquation: FunctionInterface = {
		equation: '',
		color: '#000000',
		lineStyle: LineStyleEnum.SOLID,
		index: equations.length,
	};

	const handlePlotData: () => Promise<void> = async () => {
		const equationsString = equations.map((equation) => equation.equation);
		const parsedEquationResponse = await RetrieveParsedEquationsService(equationsString);
		if (parsedEquationResponse == null || isErrorResponseInterface(parsedEquationResponse)) {
			console.log(`Error: ${parsedEquationResponse?.message ?? 'Unknown error'}`);
			return;
		}
		setPlotData(
			equations
				.filter((equations) => equations.equation.length > 0)
				.map((equation) => ({
					...equation,
					stringEquation: HomePageUtils.splitExpression(parsedEquationResponse.data.parsed_expressions[equation.index]),
				}))
				.filter((equation) => HomePageUtils.isPlottable(equation.stringEquation))
				.map((equation) => ({
					fn: HomePageUtils.splitExpression(parsedEquationResponse.data.parsed_expressions[equation.index]),
					color: equation.color,
					graphType: equation.lineStyle,
					nSamples: equation.lineStyle === LineStyleEnum.DOTTED ? 150 : undefined,
				})),
		);
	};

	const handleSetEquations: (newEquations: FunctionInterface[]) => void = (newEquations) => {
		setEquations([...newEquations]);

		handlePlotData().catch((error) => {
			console.error(error);
		});
		setShowPlot(false);
		setShowPlot(true);
	};

	if (equations.length === 0) {
		setEquations([{ ...newEquation }]);
	}

	return (
		<div data-testid={'home-page'}>
			<Navbar currentPage={'home'} equations={equations} setEquations={handleSetEquations} actualGid={gid} />
			{showPlot && <Plot data={plotData} key={'plot-graph'} />}
		</div>
	);
};

export default Home;
