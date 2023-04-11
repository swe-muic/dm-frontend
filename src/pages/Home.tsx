import React, { useState } from 'react';
import Plot from '../components/Graph/GraphComponent';
import Navbar from '../components/NavBar/NavBar';
import type FunctionInterface from '@/interfaces/FunctionInterface';
import { type FunctionPlotDatum } from 'function-plot/dist/types';
import LineStyleEnum from '../enum/LineStyleEnum';

const Home: React.FunctionComponent = () => {
	const [equations, setEquations] = useState<FunctionInterface[]>([]);
	const [plotData, setPlotData] = useState<FunctionPlotDatum[]>([]);
	const [showPlot, setShowPlot] = useState<boolean>(true);
	const newEquation: FunctionInterface = {
		equation: '',
		color: 'black',
		lineStyle: LineStyleEnum.SOLID,
		index: equations.length,
	};

	const handleSetEquations: (newEquations: FunctionInterface[]) => void = (newEquations) => {
		setEquations([...newEquations]);
		new Promise((resolve) => setTimeout(resolve, 100))
			.then(() => {
				setPlotData(
					equations
						.filter((equations) => equations.equation.length > 0)
						.map((equation) => ({
							fn: equation.equation, // TODO: get parsed equation from backend
							color: equation.color,
							graphType: equation.lineStyle,
							nSamples: equation.lineStyle === LineStyleEnum.DOTTED ? 150 : undefined,
						})),
				);
			})
			.catch((err) => {
				console.log(err);
			});
		setShowPlot(false);
		setShowPlot(true);
	};

	if (equations.length === 0) {
		setEquations([newEquation]);
	}

	return (
		<div data-testid={'home-page'}>
			<Navbar currentPage={'home'} equations={equations} setEquations={handleSetEquations} />
			{showPlot && <Plot data={plotData} key={'plot-graph'} />}
		</div>
	);
};

export default Home;
