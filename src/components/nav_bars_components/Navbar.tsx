import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import UserIcon from './userIconButton';
import DeleteIcon from './deleteIconButton';
import SaveIcon from './saveIconButton';
import NavBarTitle from './navBarTitle';
import EditBarIcon from './editIconButton';
import MenuIcon from './menuIconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Navbar(): React.ReactElement {
	const [isLogIn, setIsLogin] = useState(false);
	const graphTitle = 'GRAPH TITLE';
	const handleClick = (): void => {
		setIsLogin(!isLogIn);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position='static'
				style={{
					background: '#043551',
				}}
			>
				<Toolbar>
					<MenuIcon />
					<TextField
						id='standard-basic'
						variant='standard'
						defaultValue={graphTitle}
						sx={{
							input: { color: 'white' },
							label: { color: 'white' },
						}}
					/>

					<EditBarIcon />
					<NavBarTitle />

					{isLogIn ? (
						<Stack direction='row'>
							<SaveIcon />
							<DeleteIcon />
							<UserIcon />
						</Stack>
					) : (
						<Stack spacing={4} direction='row'>
							<Button color='inherit' onClick={handleClick}>
								REGISTER
							</Button>

							<Button color='inherit' onClick={handleClick}>
								LOGIN
							</Button>
						</Stack>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}

// export default Navbar
