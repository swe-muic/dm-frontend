import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Drawer } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

function MenuIconButton(): React.ReactElement {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [numFields, setNumFields] = useState(1);
	const [equations, setEquations] = useState(['']);

	const addField = (): void => {
		setNumFields(numFields + 1);
		setEquations([...equations, '']);
	};

	const handleChange = (index: number, value: string): void => {
		const newEquations = [...equations];
		newEquations[index] = value;
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
							<Box key={index} mb={2}>
								<TextField
									label={`Equation ${index + 1}`}
									variant='outlined'
									fullWidth
									value={equation}
									onChange={(e) => {
										handleChange(index, e.target.value);
									}}
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
