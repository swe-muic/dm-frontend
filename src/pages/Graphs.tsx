import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/FirebaseConfig';
import Button from '@mui/material/Button';
import AuthRoute from '../components/AuthRoute';

const Graphs: React.FunctionComponent = () => {
	const thisAuth = auth;
	const navigate = useNavigate();

	return (
		<AuthRoute>
			<div>
				<h1>This is the My Graphs section, where your saved graphs are stored</h1>
				<Button
					data-testid={'sign-out'}
					onClick={() => {
						void signOut(thisAuth).then(() => {
							navigate('/');
						});
					}}
				>
					Sign Out
				</Button>
			</div>
		</AuthRoute>
	);
};

export default Graphs;
