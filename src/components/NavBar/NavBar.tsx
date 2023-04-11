import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/FirebaseConfig';
import getBackgroundColor from './NavBarColor/NavBarBackGroundSelector';
import chekIsItEdit from './SubComponentFromNavBar/EditOrTextField';
import checkIsItLogin from './SubComponentFromNavBar/LoginOrEmpty';
import checkIsLogin from './SubComponentFromNavBar/AuthenOrSave';
import loadable from '@loadable/component';

/* eslint-disable @typescript-eslint/promise-function-async */
const HomeIconButton = loadable(() => import('./NavBarButton/HomeIconButton'));
const MenuIcon = loadable(() => import('./NavBarButton/MenuIconButton'));
const UserIcon = loadable(() => import('./NavBarButton/UserIconButton'));
/* eslint-enable @typescript-eslint/promise-function-async */

export interface NavbarProps {
	currentPage: string;
	forceLogin?: boolean;
}

interface Graph {
	id: number;
	name: string;
	preview: string;
	owner: string;
	created: string;
	updated: string;
}

interface GraphDetailResponse {
	status: number;
	message: string;
	data: Graph;
}

interface GraphValidationErrorResponse {
	status: number;
	message: string;
	data: Graph;
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

	const isGraphExist = async (graphId: number): Promise<boolean> => {
		try {
			const response = await fetch(`http://127.0.0.1:8000/api/viewset/graphs/${graphId}/`, {
				method: 'GET',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.status === 200) {
				return true; // Graph exists
			} else if (response.status === 404) {
				return false; // Graph does not exist
			}
			console.log(response);
		} catch (e) {
			console.log(e);
		}
		return false;
	};

	const updateGraph = async (graphId: number): Promise<void> => {
		const dateTimeNow = new Date();
		const graphReq = {
			name: buttonText,
			preview: 'minio_bucket_test2',
			updated: dateTimeNow.toDateString(),
			owner: auth.currentUser?.uid,
		};
		const response = await fetch(`http://127.0.0.1:8000/api/viewset/graphs/${graphId}/`, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(graphReq),
		});
		if (!response.ok) {
			const errorResponse: GraphValidationErrorResponse = await response.json();
			throw new Error(errorResponse.message);
		}
		const graphDetail: GraphDetailResponse = await response.json();
		console.log(graphDetail.data);
	};

	const createGraph = async (): Promise<void> => {
		const graphReq = {
			name: buttonText,
			preview: 'minio_bucket_test',
			owner: auth.currentUser?.uid,
		};
		const response = await fetch('http://127.0.0.1:8000/api/viewset/graphs/', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(graphReq),
		});
		if (!response.ok) {
			const errorResponse: GraphValidationErrorResponse = await response.json();
			throw new Error(errorResponse.message);
		}
		const graphDetail: GraphDetailResponse = await response.json();
		setGid(graphDetail.data.id);
		console.log(graphDetail.data);
	};

	const handleSaveIconClick = async (): Promise<void> => {
		const user = auth.currentUser;
		setIsSave(true);
		if (user != null) {
			console.log(user);
			const isExist = await isGraphExist(gid);
			console.log(isExist);
			if (isExist) {
				await updateGraph(gid);
			} else {
				await createGraph();
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

				{currentPage === 'home' ? chekIsItEdit(isEdit, handleEditGraphName, buttonText, handleChange) : null}

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
