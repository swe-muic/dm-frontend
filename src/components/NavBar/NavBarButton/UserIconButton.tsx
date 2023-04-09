import React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../config/FirebaseConfig';
import { signOut } from 'firebase/auth';

function UserIconButton(): React.ReactElement {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const thisAuth = auth;
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		if (anchorEl != null) {
			// eslint-disable-next-line no-use-before-define
			handleClose();
		} else {
			setAnchorEl(event.currentTarget);
		}
	};
	const handleClose = (): void => {
		setAnchorEl(null);
	};
	/* istanbul ignore next */
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
		<div>
			<IconButton
				data-testid='user-icon-button'
				size='large'
				edge='start'
				color='inherit'
				aria-label='menu'
				sx={{ mr: 2 }}
				aria-controls={anchorEl != null ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={anchorEl != null ? 'true' : undefined}
				onClick={handleClick}
			>
				<AccountCircleIcon />
			</IconButton>

			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem data-testid='my-graph-button' onClick={handleClickMyGraph}>
					My Graph
				</MenuItem>
				<MenuItem onClick={handleClickLogOut}>Logout</MenuItem>
			</Menu>
		</div>
	);
}

export default UserIconButton;
