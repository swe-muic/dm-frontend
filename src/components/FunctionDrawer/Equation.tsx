import Grid2 from '@mui/material/Unstable_Grid2';
import loadable from '@loadable/component';
import React, { useState } from 'react';
import type FunctionInterface from '../../interfaces/FunctionInterface';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

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

function Equation(props: FunctionProp): React.ReactElement | null {
	const { equation, index, handleInputChange, handleColorChange, handleLineStyleChange } = props;

	const [isDeleted, setIsDeleted] = useState(false);

	const deleteField = (): void => {
		console.log('delete');
		setIsDeleted(true);
	};

	if (isDeleted) {
		return null;
	}

	return (
		<Grid2 container spacing={2} display={'flex'}>
			<Grid2 xs={2}>
				<LineStylePopover
					color={equation.color}
					lineStyle={equation.lineStyle}
					handleColorChange={handleColorChange}
					handleLineStyleChange={handleLineStyleChange}
				/>
			</Grid2>
			<Grid2 xs={8}>
				<MathField equation={equation.equation} index={index} handleChange={handleInputChange} />
			</Grid2>
			<Grid2 xs={2}>
				<IconButton data-testid='delete-button' size={'large'} onClick={deleteField}>
					<DeleteIcon />
				</IconButton>
			</Grid2>
		</Grid2>
	);
}

export default Equation;
