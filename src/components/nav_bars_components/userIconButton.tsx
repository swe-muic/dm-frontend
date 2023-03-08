import React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
export default function userIconButton(): React.ReactElement {
	return (
		<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
			<AccountCircle />
		</IconButton>
	);
}
