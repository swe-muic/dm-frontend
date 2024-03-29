import Grid2 from '@mui/material/Unstable_Grid2';

import loadable from '@loadable/component';
import React from 'react';
import type FunctionInterface from '../../interfaces/FunctionInterface';

/* eslint-disable @typescript-eslint/promise-function-async */
const MathField = loadable(() => import('./MathField/MathField'));
const LineStylePopover = loadable(() => import('./LineStylePopover/LineStylePopover'));
/* eslint-enable @typescript-eslint/promise-function-async */

export interface FunctionProp {
	equation: FunctionInterface;
	index: number;
	handleInputChange: (value: string) => void;
	handleColorChange: (value: string) => void;
	handleLineStyleChange: (value: string) => void;
}

function Equation(props: FunctionProp): React.ReactElement {
	const { equation, index, handleInputChange, handleColorChange, handleLineStyleChange } = props;

	return (
		<Grid2 container spacing={2} display={'flex'}>
			<Grid2>
				<LineStylePopover
					color={equation.color}
					lineStyle={equation.lineStyle}
					handleColorChange={handleColorChange}
					handleLineStyleChange={handleLineStyleChange}
				/>
			</Grid2>
			<Grid2 sm={10} md={10}>
				<MathField equation={equation.equation} index={index} handleChange={handleInputChange} />
			</Grid2>
		</Grid2>
	);
}

export default Equation;
