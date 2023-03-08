import React from 'react';
import IconButton from '@mui/material/IconButton';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

export default function editIconButton(): React.ReactElement {
	return (
		<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
			<BorderColorOutlinedIcon />
		</IconButton>
	);
}
