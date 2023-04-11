import React, { useState } from 'react';
import Plot from '../components/Graph/GraphComponent';
import Navbar from '../components/NavBar/NavBar';
import type FunctionInterface from '@/interfaces/FunctionInterface';
import { type FunctionPlotDatum } from 'function-plot/dist/types';
import LineStyleEnum from '../enum/LineStyleEnum';

const Home: React.FunctionComponent = () => {
	const [equations, setEquations] = useState<FunctionInterface[]>([]);
	const [plotData, setPlotData] = useState<FunctionPlotDatum[]>([]);
	const newEquation: FunctionInterface = {
		equation: '',
		color: 'black',
		lineStyle: LineStyleEnum.SOLID,
		index: equations.length,
	};

	const handleSetEquations: (newEquations: FunctionInterface[]) => void = (newEquations) => {
		setEquations(newEquations);
		setPlotData(
			equations
				.filter((equations) => equations.equation.length > 0)
				.map((equation) => ({
					fn: equation.equation, // TODO: get parsed equation from backend
					color: equation.color,
					graphType: equation.lineStyle,
				})),
		);
	};

	if (equations.length === 0) {
		setEquations([newEquation]);
	}

	return (
		<div data-testid={'home-page'}>
			<Navbar currentPage={'home'} equations={equations} setEquations={handleSetEquations} />
			<Plot data={plotData} />
		</div>
	);
};

export default Home;
