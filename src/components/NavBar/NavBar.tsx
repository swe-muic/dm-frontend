import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/FirebaseConfig';
import getBackgroundColor from './NavBarColor/NavBarBackGroundSelector';
import checkIsItEdit from './SubComponentFromNavBar/EditOrTextField';
import checkIsItLogin from './SubComponentFromNavBar/LoginOrEmpty';
import checkIsLogin from './SubComponentFromNavBar/AuthenOrSave';
import loadable from '@loadable/component';
import CreateGraph from '../../services/api/CreateGraphService';
import GraphExists from '../../services/api/CheckGraphExistsService';
import UpdateGraph from '../../services/api/UpdateGraphService';

/* eslint-disable @typescript-eslint/promise-function-async */
const HomeIconButton = loadable(() => import('./NavBarButton/HomeIconButton'));
const MenuIcon = loadable(() => import('./NavBarButton/MenuIconButton'));
const UserIcon = loadable(() => import('./NavBarButton/UserIconButton'));
/* eslint-enable @typescript-eslint/promise-function-async */

export interface NavbarProps {
	currentPage: string;
	forceLogin?: boolean;
}

export default function Navbar(props: NavbarProps): React.ReactElement {
	const { currentPage, forceLogin } = props;
	const navigate = useNavigate();
	const [gid, setGid] = useState(-1);
	const [isLogIn, setIsLogin] = useState(forceLogin ?? false);
	const [isEdit, setIsEdit] = useState(false);
	const [isSave, setIsSave] = useState(false);
	const [buttonText, setDisplayText] = useState('GRAPH TITLE');

	// eslint-disable-next-line no-undef
	/* istanbul ignore next */
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user != null) {
				setIsLogin(true);
			} else {
				setIsLogin(false);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const handleLoginRegisClick = (): void => {
		navigate('/login');
		setIsLogin(!isLogIn);
	};

	const handleSaveIconClick = async (): Promise<void> => {
		const user = auth.currentUser;
		setIsSave(true);
		if (user != null) {
			const uid = user.uid;
			// console.log(user);
			const isExist = await GraphExists(gid);
			// console.log(isExist);
			if (isExist) {
				await UpdateGraph(buttonText, gid, uid);
			} else {
				const newGraphId = await CreateGraph(buttonText, uid);
				setGid(newGraphId);
			}
		} else {
			console.log('null user');
		}
	};

	const handleEditGraphName = (): void => {
		setIsEdit(!isEdit);
	};

	const appBarStyle = {
		background: getBackgroundColor(currentPage), // change background color based on the currentPage
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setDisplayText(event.target.value);
	};
	return (
		<AppBar position='static' style={appBarStyle}>
			<Toolbar>
				{currentPage === 'home' ? <MenuIcon /> : <HomeIconButton />}

				{currentPage === 'home' ? checkIsItEdit(isEdit, handleEditGraphName, buttonText, handleChange) : null}

				{currentPage === 'home' ? checkIsItLogin(isLogIn, handleEditGraphName) : null}

				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }} style={{ position: 'absolute', right: '50%' }}>
					Deezmoz
				</Typography>

				{currentPage === 'graphs' ? (
					<Stack direction='row' style={{ position: 'absolute', right: '1.25%' }}>
						<UserIcon />
					</Stack>
				) : null}

				{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
				{currentPage === 'home' ? checkIsLogin(isLogIn, handleSaveIconClick, isSave, handleLoginRegisClick, gid) : null}
			</Toolbar>
		</AppBar>
	);
}
