import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Box from '@mui/material/Box';
import style from '../NavBarModal/Modal';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';

export default function DeleteIconButton(): React.ReactElement {
	const [open, setOpen] = React.useState(false);
	const handleOpen = (): void => {
		setOpen(true);
	};
	const handleClose = (): void => {
		setOpen(false);
	};

	const handleDelete = async (graphId: number): Promise<void> => {
		try {
			const response = await fetch(`http://127.0.0.1:8000/api/viewset/graphs/${graphId}/`, {
				method: 'DELETE',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) {
				const errorResponse = await response.json();
				throw new Error(errorResponse.message);
			}
			console.log(response.json());
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div>
			<IconButton
				data-testid='delete-icon-button'
				size='large'
				edge='start'
				color='inherit'
				aria-label='menu'
				sx={{ mr: 2 }}
				onClick={handleOpen}
			>
				<DeleteOutlineOutlinedIcon />
			</IconButton>
			<Modal
				open={open}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
				data-testid='delete-modal'
			>
				<Box sx={style}>
					<Typography
						data-testid='modal-modal-title'
						variant='h6'
						component='h2'
						fontSize={38}
						align={'center'}
						style={{ marginTop: 30 }}
					>
						Are you sure you want
					</Typography>
					<Typography id='modal-modal-title' variant='h6' component='h2' fontSize={38} align={'center'}>
						to delete this graph?
					</Typography>
					<Stack spacing={4} direction='row' justifyContent={'center'} alignContent={'center'} style={{ margin: 50 }}>
						<Button
							data-testid='cancel-button'
							variant='outlined'
							onClick={handleClose}
							sx={{
								height: 51,
								width: 222,
								borderColor: '#043551',
								color: '#043551',
								borderRadius: '6px',
							}}
						>
							CANCEL
						</Button>
						<Button
							data-testid='delete-button'
							variant='contained'
							onClick={(event: React.MouseEvent<HTMLElement>) => {
								void handleDelete(40);
							}}
							sx={{ height: 51, width: 222, bgcolor: '#043551', borderRadius: '6px' }}
						>
							DELETE
						</Button>
					</Stack>
				</Box>
			</Modal>
		</div>
	);
}
