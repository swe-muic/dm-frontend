import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function chekIsItEdit(
	isEdit: boolean,
	handleEditGraphName: () => void,
	buttonText: string,
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
): React.ReactElement {
	return !isEdit ? (
		<Button data-testid='graph-name-text-button' color='inherit' onDoubleClick={handleEditGraphName}>
			{buttonText}
		</Button>
	) : (
		<TextField
			inputProps={{ 'data-testid': 'text-display-input' }}
			variant='standard'
			defaultValue={buttonText}
			onChange={handleChange}
			sx={{
				input: { color: 'white' },
				label: { color: 'white' },
			}}
		/>
	);
}
