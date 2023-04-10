import React from 'react';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

function HomeIconButton(): React.ReactElement {
	const navigate = useNavigate();
	return (
		<IconButton
			data-testid='home-button'
			color='inherit'
			onClick={() => {
				navigate('/');
			}}
		>
			<HomeIcon />
		</IconButton>
	);
}
export default HomeIconButton;
