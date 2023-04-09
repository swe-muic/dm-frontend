import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Drawer } from '@mui/material';

/* istanbul ignore next */

export default function menuIconButton(): React.ReactElement {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<div>
			<IconButton
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
			<Drawer
				anchor='left'
				open={isDrawerOpen}
				onClose={() => {
					setIsDrawerOpen(false);
				}}
			>
				<Box p={2} width='500px' textAlign='center' role='presentation'>
					<Typography variant='h6' component='div'>
						Input Equation
					</Typography>
				</Box>
			</Drawer>
		</div>
	);
}
