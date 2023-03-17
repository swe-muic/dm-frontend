import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import UserIcon from './nav_bar_button/userIconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Typography from '@mui/material/Typography';
import NavBarTitle from './navBarTitle';
import MenuIcon from './nav_bar_button/menuIconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import IconButton from '@mui/material/IconButton';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Modal from '@mui/material/Modal';
import { style } from './nav_bar_modal/modal';
export default function Navbar(): React.ReactElement {
	const [isLogIn, setIsLogin] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [isSave, setIsSave] = useState(false);
	const [buttonText, setDisplayText] = useState('GRAPH TITLE');
	const [open, setOpen] = React.useState(false);
	const handleOpen = (): void => {
		setOpen(true);
	};
	const handleClose = (): void => {
		setOpen(false);
	};
	const handleLoginRegisClick = (): void => {
		setIsLogin(!isLogIn);
	};

	const handleSaveIconClick = (): void => {
		if (!isSave) {
			setIsSave(!isSave);
		}
	};

	const handleSetText = (): void => {
		if (isLogIn) {
			setDisplayText(buttonText);
		}
	};

	const handleEditGraphName = (): void => {
		if (isLogIn) {
			setIsEdit(!isEdit);
			handleSetText();
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setDisplayText(event.target.value);
	};

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
					{!isEdit ? (
						<Button color='inherit' onDoubleClick={handleEditGraphName}>
							{buttonText}
						</Button>
					) : (
						<TextField
							id='standard-basic'
							variant='standard'
							defaultValue={buttonText}
							onChange={handleChange}
							sx={{
								input: { color: 'white' },
								label: { color: 'white' },
							}}
						/>
					)}
					{isLogIn ? (
						<IconButton
							size='large'
							edge='start'
							color='inherit'
							aria-label='menu'
							sx={{ mr: 2 }}
							onClick={handleEditGraphName}
						>
							<BorderColorOutlinedIcon />
						</IconButton>
					) : null}

					<NavBarTitle />

					{isLogIn ? (
						<Stack direction='row' style={{ position: 'absolute', right: '1.25%' }}>
							<IconButton
								size='large'
								edge='start'
								color='inherit'
								aria-label='menu'
								sx={{ mr: 2 }}
								onClick={handleSaveIconClick}
							>
								<SaveOutlinedIcon />
							</IconButton>
							{isSave ? (
								<div>
									<IconButton
										size='large'
										edge='start'
										color='inherit'
										aria-label='menu'
										sx={{ mr: 2 }}
										onClick={handleOpen}
									>
										<DeleteOutlineOutlinedIcon />
									</IconButton>
									<Modal open={open} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
										<Box sx={style}>
											<Typography
												id='modal-modal-title'
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
											<Stack
												spacing={4}
												direction='row'
												justifyContent={'center'}
												alignContent={'center'}
												style={{ margin: 50 }}
											>
												<Button
													variant='outlined'
													onClick={handleClose}
													sx={{ height: 51, width: 222, borderColor: '#043551', color: '#043551', borderRadius: '6px' }}
												>
													CANCEL
												</Button>
												<Button
													variant='contained'
													onClick={handleClose}
													sx={{ height: 51, width: 222, bgcolor: '#043551', borderRadius: '6px' }}
												>
													DELETE
												</Button>
											</Stack>
										</Box>
									</Modal>
								</div>
							) : null}
							<UserIcon />
						</Stack>
					) : (
						<Stack spacing={4} direction='row' style={{ position: 'absolute', right: '1.25%' }}>
							<Button color='inherit' onClick={handleLoginRegisClick}>
								REGISTER
							</Button>

							<Button color='inherit' onClick={handleLoginRegisClick}>
								LOGIN
							</Button>
						</Stack>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
