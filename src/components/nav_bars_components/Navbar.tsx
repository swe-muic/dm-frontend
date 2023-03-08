import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import UserIcon from './userIconButton';
import DeleteIcon from './deleteIconButton';
import SaveIcon from './saveIconButton';
import NavBarTitle from './navBarTitle';
import EditBarIcon from './editIconButton';
import MenuIcon from './menuIconButton';

export default function Navbar(): React.ReactElement {
	const graphTitle = 'GRAPH TITLE';
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position='static'
				style={{
					background: '#043551',
				}}
			>
				<Toolbar>
					<MenuIcon />
					<TextField
						id='standard-basic'
						variant='standard'
						defaultValue={graphTitle}
						sx={{
							input: { color: 'white' },
							label: { color: 'white' },
						}}
					/>

					<EditBarIcon />
					<NavBarTitle />
					<SaveIcon />
					<DeleteIcon />
					<UserIcon />
				</Toolbar>
			</AppBar>
		</Box>
	);
}

// export default Navbar
