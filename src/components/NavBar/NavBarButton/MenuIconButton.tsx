import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Drawer } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import loadable from '@loadable/component';
import type FunctionInterface from '../../../interfaces/FunctionInterface';
import LineStyleEnum from '../../../enum/LineStyleEnum';
import FieldEnum from '../../../enum/FieldEnum';

/* eslint-disable @typescript-eslint/promise-function-async */
const Equation = loadable(() => import('../../FunctionDrawer/Equation'));
/* eslint-enable @typescript-eslint/promise-function-async */

export interface MenuIconProps {
	equations: FunctionInterface[];
	setEquations: (equations: FunctionInterface[]) => void;
}

function MenuIconButton(props: MenuIconProps): React.ReactElement {
	const { equations, setEquations } = props;
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [numFields, setNumFields] = useState(1);
	const newEquation: FunctionInterface = { equation: '', color: 'black', lineStyle: LineStyleEnum.SOLID, index: 0 };

	const addField = (): void => {
		setNumFields(numFields + 1);
		setEquations([...equations, { ...newEquation, index: equations.length }]);
	};
	/* istanbul ignore next */
	const handleInputChanges: (field: FieldEnum) => (index: number) => (value: string | LineStyleEnum) => void =
		(field) => (index) => (value) => {
			const newEquations = [...equations];
			if (field === FieldEnum.LINE_STYLE) {
				newEquations[index][field] = value as LineStyleEnum;
			} else {
				newEquations[index][field] = value;
			}
			setEquations(newEquations);
		};

	return (
		<div>
			<IconButton
				data-testid='menu-icon-button'
				size='large'
				edge='start'
				color='inherit'
				aria-label='menu'
				sx={{ mr: 2 }}
				onClick={() => {
					setIsDrawerOpen(true);
				}}
			>
				<MenuIcon />
			</IconButton>
			<Drawer data-testid='drawer' anchor='left' variant='persistent' open={isDrawerOpen}>
				<Box p={2} width='500px' textAlign='center' role='presentation'>
					<Stack direction='row' alignItems='center' justifyContent='space-between'>
						<Typography variant='h6' component='div'>
							Input Equation
						</Typography>
						<IconButton
							data-testid='back-button'
							onClick={() => {
								setIsDrawerOpen(false);
							}}
						>
							<ArrowBackIosNewIcon />
						</IconButton>
					</Stack>
					<Box mt={2}>
						{equations.map((equation, index) => (
							<Box data-testid={`equation-${index + 1}`} key={equation.index} mb={2}>
								<Equation
									equation={equation}
									index={index}
									handleInputChange={handleInputChanges(FieldEnum.EQUATION)(index)}
									handleColorChange={handleInputChanges(FieldEnum.COLOR)(index)}
									handleLineStyleChange={handleInputChanges(FieldEnum.LINE_STYLE)(index)}
								/>
							</Box>
						))}
						<IconButton data-testid='add-button' onClick={addField}>
							<AddIcon />
						</IconButton>
					</Box>
				</Box>
			</Drawer>
		</div>
	);
}
export default MenuIconButton;
