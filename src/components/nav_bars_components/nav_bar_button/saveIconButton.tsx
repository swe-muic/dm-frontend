import React from 'react';
import IconButton from '@mui/material/IconButton';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

export default function saveIconButton(): React.ReactElement {
	return (
		<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
			<SaveOutlinedIcon />
		</IconButton>
	);
}
