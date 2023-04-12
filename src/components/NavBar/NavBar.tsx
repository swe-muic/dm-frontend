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
import UpdateGraph from '../../services/api/UpdateGraphService';
import type FunctionInterface from '../../interfaces/FunctionInterface';
import html2canvas from 'html2canvas';
import UploadScreenshotToMinio from '../../services/minio/InsertObjectService';
import GetGraphInformation from '../../services/api/GetGraphInformationService';
import { isErrorResponseInterface } from '../../interfaces/response/ErrorResponseInterface';
import GetAllGraphEquations from '../../services/api/GetAllGraphEquationsService';
import { mapToFunctionInterface } from '../../interfaces/schema/EquationInterface';
import AddAllGraphEquationsService from '../../services/api/AddAllGraphEquationsService';
import DeleteAllGraphEquationsService from '../../services/api/DeleteAllGraphEquationsService';

/* eslint-disable @typescript-eslint/promise-function-async */
const HomeIconButton = loadable(() => import('./NavBarButton/HomeIconButton'));
const MenuIcon = loadable(() => import('./NavBarButton/MenuIconButton'));
const UserIcon = loadable(() => import('./NavBarButton/UserIconButton'));
/* eslint-enable @typescript-eslint/promise-function-async */

export interface NavbarProps {
	currentPage: string;
	forceLogin?: boolean;
	equations?: FunctionInterface[];
	setEquations?: (equations: FunctionInterface[]) => void;
	actualGid?: number;
}

export default function Navbar(props: NavbarProps): React.ReactElement {
	const { currentPage, forceLogin, setEquations, equations, actualGid } = props;
	const navigate = useNavigate();
	const [gid, setGid] = useState(actualGid ?? -1);
	const [isLogIn, setIsLogin] = useState(forceLogin ?? false);
	const [isEdit, setIsEdit] = useState(false);
	const [isSave, setIsSave] = useState(false);
	const [buttonText, setDisplayText] = useState('GRAPH TITLE');
	const [isDirty, setIsDirty] = useState(false);

	const handleCheckGraphExists = (): void => {
		setIsDirty(true);
		if (gid === 0) {
			setGid(-1);
		}
		GetGraphInformation(gid)
			.then((res) => {
				if (!isErrorResponseInterface(res)) {
					console.log(res);
					setDisplayText(res.data.name);
					GetAllGraphEquations(gid)
						.then((equations) => {
							if (setEquations != null) {
								setEquations(equations.map((equation, index) => mapToFunctionInterface(equation, index)));
							}
						})
						.catch((e) => {
							console.log(e);
						});
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	if (!isDirty) {
		handleCheckGraphExists();
	}

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

	const handleUpdateGraph = async (uid: string, gid: number): Promise<void> => {
		await html2canvas(document.body).then((canvas) => {
			const bucketName = `user-${uid}-bucket`;
			const preview = `graph-${gid}-preview`;
			canvas.toBlob((blob) => {
				UploadScreenshotToMinio(blob ?? new Blob(), bucketName, preview)
					.then((canUpload) => {
						if (canUpload) {
							UpdateGraph(buttonText, gid, uid, preview).catch((e) => {
								console.log(e);
							});
						}
					})
					.catch((e) => {
						console.log(e);
					});
			});
		});
		await DeleteAllGraphEquationsService(gid);
		await AddAllGraphEquationsService(equations ?? [], gid);
	};

	const handleSaveIconClick = async (): Promise<void> => {
		const user = auth.currentUser;
		setIsSave(true);
		if (user != null) {
			const uid = user.uid;
			const isExist = gid !== -1;
			if (isExist) {
				await handleUpdateGraph(uid, gid);
			} else {
				CreateGraph(buttonText, uid)
					.then(async (newGraphId) => {
						await handleUpdateGraph(uid, newGraphId);
						setGid(newGraphId);
						navigate(`${gid}`);
					})
					.catch((e) => {
						console.log(e);
					});
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

	const noSetEquations: (equations: FunctionInterface[]) => void = (_) => {
		throw new Error('setEquations is not defined');
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setDisplayText(event.target.value);
	};
	return (
		<AppBar position='static' style={appBarStyle}>
			<Toolbar>
				{currentPage === 'home' ? (
					<MenuIcon equations={equations ?? []} setEquations={setEquations ?? noSetEquations} />
				) : (
					<HomeIconButton />
				)}

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
