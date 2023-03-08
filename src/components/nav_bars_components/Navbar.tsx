import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import TextField from '@mui/material/TextField';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import UserIcon from './userIconButton';
import DeleteIcon from './deleteIconButton';

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
					<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>

					<TextField
						id='standard-basic'
						variant='standard'
						defaultValue={graphTitle}
						sx={{
							input: { color: 'white' },
							label: { color: 'white' },
						}}
					/>

					<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
						<BorderColorOutlinedIcon />
					</IconButton>

					<Typography variant='h6' component='div' align={'center'} sx={{ flexGrow: 1 }}>
						Deezmos
					</Typography>

					<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
						<SaveOutlinedIcon />
					</IconButton>
					<DeleteIcon />
					<UserIcon />
				</Toolbar>
			</AppBar>
		</Box>
	);
}

// export default Navbar
