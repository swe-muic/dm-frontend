import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
export default function deleteIconButton(): React.ReactElement {
	return (
		<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
			<DeleteOutlineOutlinedIcon />
		</IconButton>
	);
}
