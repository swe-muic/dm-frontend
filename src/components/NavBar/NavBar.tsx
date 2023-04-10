import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import IconButton from '@mui/material/IconButton';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/FirebaseConfig';
import getBackgroundColor from './NavBarColor/NavBarBackGroundSelector';

import loadable from '@loadable/component';

/* eslint-disable @typescript-eslint/promise-function-async */
const HomeIconButton = loadable(() => import('./NavBarButton/HomeIconButton'));
const MenuIcon = loadable(() => import('./NavBarButton/MenuIconButton'));
const UserIcon = loadable(() => import('./NavBarButton/UserIconButton'));
const DeleteIcon = loadable(() => import('./NavBarButton/DeleteIconButton'));
/* eslint-enable @typescript-eslint/promise-function-async */

export interface NavbarProps {
	currentPage: string;
	forceLogin?: boolean;
}

export function chekIsItEdit(
	isEdit: boolean,
	handleEditGraphName: () => void,
	buttonText: string,
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
): React.ReactElement {
	return !isEdit ? (
		<Button data-testid='graph-name-text-button' color='inherit' onDoubleClick={handleEditGraphName}>
			{buttonText}
		</Button>
	) : (
		<TextField
			inputProps={{ 'data-testid': 'text-display-input' }}
			variant='standard'
			defaultValue={buttonText}
			onChange={handleChange}
			sx={{
				input: { color: 'white' },
				label: { color: 'white' },
			}}
		/>
	);
}

export function checkIsItLogin(isLogIn: boolean, handleEditGraphName: () => void): React.ReactElement | null {
	return isLogIn ? (
		<IconButton
			data-testid='edit-icon-button'
			size='large'
			edge='start'
			color='inherit'
			aria-label='menu'
			sx={{ mr: 2 }}
			onClick={handleEditGraphName}
		>
			<BorderColorOutlinedIcon />
		</IconButton>
	) : null;
}

export default function Navbar(props: NavbarProps): React.ReactElement {
	const { currentPage, forceLogin } = props;
	const navigate = useNavigate();
	const [isLogIn, setIsLogin] = useState(forceLogin ?? false);
	const [isEdit, setIsEdit] = useState(false);
	const [isSave, setIsSave] = useState(false);
	const [buttonText, setDisplayText] = useState('GRAPH TITLE');

	// eslint-disable-next-line no-undef
	/* istanbul ignore next */
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user != null) {
				setIsLogin(true);
			} else {
				setIsLogin(false);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const handleLoginRegisClick = (): void => {
		navigate('/login');
		setIsLogin(!isLogIn);
	};

	const handleSaveIconClick = (): void => {
		setIsSave(true);
	};

	const handleEditGraphName = (): void => {
		setIsEdit(!isEdit);
	};

	const appBarStyle = {
		background: getBackgroundColor(currentPage), // change background color based on the currentPage
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setDisplayText(event.target.value);
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static' style={appBarStyle}>
				<Toolbar>
					{currentPage === 'home' ? <MenuIcon /> : <HomeIconButton />}

					{currentPage === 'home' ? chekIsItEdit(isEdit, handleEditGraphName, buttonText, handleChange) : null}

					{currentPage === 'home' ? checkIsItLogin(isLogIn, handleEditGraphName) : null}

					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }} style={{ position: 'absolute', right: '50%' }}>
						Deezmos
					</Typography>

					{currentPage === 'graphs' ? (
						<Stack direction='row' style={{ position: 'absolute', right: '1.25%' }}>
							<UserIcon />
						</Stack>
					) : null}

					{currentPage === 'home' ? (
						isLogIn ? (
							<Stack direction='row' style={{ position: 'absolute', right: '1.25%' }}>
								<IconButton
									data-testid='save-icon-button'
									size='large'
									edge='start'
									color='inherit'
									aria-label='menu'
									sx={{ mr: 2 }}
									onClick={handleSaveIconClick}
								>
									<SaveOutlinedIcon />
								</IconButton>
								{isSave ? <DeleteIcon data-testid='delete-icon-buttons' /> : null}
								<UserIcon />
							</Stack>
						) : (
							<Stack spacing={4} direction='row' style={{ position: 'absolute', right: '1.25%' }}>
								<Button data-testid='register-button' color='inherit' onClick={handleLoginRegisClick}>
									REGISTER
								</Button>

								<Button data-testid='login-button' color='inherit' onClick={handleLoginRegisClick}>
									LOGIN
								</Button>
							</Stack>
						)
					) : null}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
