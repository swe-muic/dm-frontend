import React, { useState } from 'react';
import Plot from '../components/Graph/GraphComponent';
import Navbar from '../components/NavBar/NavBar';
import type FunctionInterface from '../interfaces/FunctionInterface';
import { type FunctionPlotDatum } from 'function-plot/dist/types';
import LineStyleEnum from '../enum/LineStyleEnum';
import RetrieveParsedEquationsService from '../services/api/RetrieveParsedEquationsService';
import { isErrorResponseInterface } from '../interfaces/response/ErrorResponseInterface';
import { useSearchParams } from 'react-router-dom';

const Home: React.FunctionComponent = () => {
	const [equations, setEquations] = useState<FunctionInterface[]>([]);
	const [plotData, setPlotData] = useState<FunctionPlotDatum[]>([]);
	const [showPlot, setShowPlot] = useState<boolean>(true);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const searchParams = useSearchParams()[0];
	const gid = Number(searchParams.get('gid')) ?? -1;
	// conver gid to number

	// Grid id
	console.log(`GID: ${gid}`);

	const newEquation: FunctionInterface = {
		equation: '',
		color: 'black',
		lineStyle: LineStyleEnum.SOLID,
		index: equations.length,
	};

	function splitExpression(expression: string): string {
		const splittedExpression = expression.split('=');
		return splittedExpression[splittedExpression.length - 1].replace(/\s/g, '');
	}

	function isPlottable(fn: string): boolean {
		try {
			// Try to evaluate the function with x = 0
			// eslint-disable-next-line no-eval
			const result = eval(`(function(x) { return ${fn}; })(0)`);
			// Check whether the result is a number
			return typeof result === 'number' && isFinite(result);
		} catch (error) {
			// If there was an error evaluating the function, it is not plottable
			return false;
		}
	}

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
					stringEquation: splitExpression(parsedEquationResponse.data.parsed_expressions[equation.index]),
				}))
				.filter((equation) => isPlottable(equation.stringEquation))
				.map((equation) => ({
					fn: splitExpression(parsedEquationResponse.data.parsed_expressions[equation.index]),
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
		setEquations([newEquation]);
	}

	return (
		<div data-testid={'home-page'}>
			<Navbar currentPage={'home'} equations={equations} setEquations={handleSetEquations} actualGid={gid} />
			{showPlot && <Plot data={plotData} key={'plot-graph'} />}
		</div>
	);
};

export default Home;
