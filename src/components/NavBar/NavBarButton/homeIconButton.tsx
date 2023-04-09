import React from 'react';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

export default function homeIconButton(): React.ReactElement {
	const navigate = useNavigate();

	return (
		<IconButton
			color='inherit'
			onClick={() => {
				navigate('/');
			}}
		>
			<HomeIcon />
		</IconButton>
	);
}
