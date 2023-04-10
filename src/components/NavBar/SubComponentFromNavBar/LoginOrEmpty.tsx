import React from 'react';
import IconButton from '@mui/material/IconButton';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

export default function checkIsItLogin(isLogIn: boolean, handleEditGraphName: () => void): React.ReactElement | null {
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
