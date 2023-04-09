import React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../config/FirebaseConfig';
import { signOut } from 'firebase/auth';
/* istanbul ignore next */
export default function userIconButton(): React.ReactElement {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const thisAuth = auth;
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (): void => {
		setAnchorEl(null);
	};
	const handleClickLogOut = (): void => {
		signOut(thisAuth)
			.then(() => {
				navigate('/');
			})
			.catch((error) => {
				console.warn(error);
			});
		setAnchorEl(null);
	};
	const handleClickMyGraph = (): void => {
		navigate('/graphs');
		setAnchorEl(null);
	};

	return (
		<IconButton
			data-testid='user-icon-button'
			size='large'
			edge='start'
			color='inherit'
			aria-label='menu'
			sx={{ mr: 2 }}
			aria-controls={open ? 'basic-menu' : undefined}
			aria-haspopup='true'
			aria-expanded={open ? 'true' : undefined}
			onClick={handleClick}
		>
			<AccountCircleIcon />

			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={handleClickMyGraph}>My Graph</MenuItem>
				<MenuItem onClick={handleClickLogOut}>Logout</MenuItem>
			</Menu>
		</IconButton>
	);
}
