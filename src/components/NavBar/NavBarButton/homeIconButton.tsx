import React from 'react';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const homeIconButton: React.FunctionComponent = () => {
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
};

export default homeIconButton;
