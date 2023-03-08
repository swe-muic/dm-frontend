import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import TextField from '@mui/material/TextField';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

export default function Navbar(): React.ReactElement {
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

					<TextField id='standard-basic' label='GRAPH TITLE' variant='filled' />

					<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
						<BorderColorOutlinedIcon />
					</IconButton>

					<Typography variant='h6' component='div' align={'center'} sx={{ flexGrow: 1 }}>
						Deezmos
					</Typography>

					<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
						<SaveOutlinedIcon />
					</IconButton>

					<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
						<DeleteOutlineOutlinedIcon />
					</IconButton>

					<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
						<AccountCircle />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

// export default Navbar
