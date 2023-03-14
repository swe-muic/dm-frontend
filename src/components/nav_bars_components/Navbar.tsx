import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import UserIcon from './nav_bar_button/userIconButton';
import DeleteIcon from './nav_bar_button/deleteIconButton';
// import SaveIcon from './nav_bar_button/saveIconButton';
import NavBarTitle from './navBarTitle';
import EditBarIcon from './nav_bar_button/editIconButton';
import MenuIcon from './nav_bar_button/menuIconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import IconButton from '@mui/material/IconButton';

export default function Navbar(): React.ReactElement {
	const [isLogIn, setIsLogin] = useState(false);
	const [isSave, setIsSave] = useState(false);
	const graphTitle = 'GRAPH TITLE';
	const handleLoginRegisClick = (): void => {
		setIsLogin(!isLogIn);
	};

	const handleSaveIconClick = (): void => {
		if (!isSave) {
			setIsSave(!isSave);
		}
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
							<IconButton
								size='large'
								edge='start'
								color='inherit'
								aria-label='menu'
								sx={{ mr: 2 }}
								onClick={handleSaveIconClick}
							>
								<SaveOutlinedIcon />
							</IconButton>
							{isSave ? <DeleteIcon /> : null}
							<UserIcon />
						</Stack>
					) : (
						<Stack spacing={4} direction='row'>
							<Button color='inherit' onClick={handleLoginRegisClick}>
								REGISTER
							</Button>

							<Button color='inherit' onClick={handleLoginRegisClick}>
								LOGIN
							</Button>
						</Stack>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
