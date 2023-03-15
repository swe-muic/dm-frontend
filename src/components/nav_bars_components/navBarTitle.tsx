import React from 'react';
import Typography from '@mui/material/Typography';

export default function navBarTitle(): React.ReactElement {
	return (
		<Typography variant='h6' component='div' sx={{ flexGrow: 1 }} style={{ position: 'absolute', right: '50%' }}>
			Deezmos
		</Typography>
	);
}
