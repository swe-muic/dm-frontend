import React from 'react';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

function homeIconButton(): React.ReactElement {
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

const homeIconButtonFC: React.FunctionComponent = () => homeIconButton();
export default homeIconButtonFC;
