import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Button from '@mui/material/Button';
import loadable from '@loadable/component';
/* eslint-disable @typescript-eslint/promise-function-async */
const UserIcon = loadable(() => import('../NavBarButton/UserIconButton'));
const DeleteIcon = loadable(() => import('../NavBarButton/DeleteIconButton'));
/* eslint-enable @typescript-eslint/promise-function-async */

export default function checkIsLogin(
	isLogIn: boolean,
	handleSaveIconClick: () => void,
	isSave: boolean,
	handleLoginRegisClick: () => void,
	graphId: number,
): React.ReactElement {
	console.log(`the graphID in authenOrsave is ${graphId}`);
	return isLogIn ? (
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
			{isSave ? <DeleteIcon data-testid='delete-icon-buttons' graphId={graphId} /> : null}
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
	);
}
