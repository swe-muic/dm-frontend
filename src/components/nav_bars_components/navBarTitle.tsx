import React from 'react';
import Typography from '@mui/material/Typography';

export default function navBarTitle(): React.ReactElement {
	return (
		<Typography variant='h6' component='div' align={'center'} sx={{ flexGrow: 1 }}>
			Deezmos
		</Typography>
	);
}
