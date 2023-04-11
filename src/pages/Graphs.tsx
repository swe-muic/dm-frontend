import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/FirebaseConfig';
import Button from '@mui/material/Button';
import Navbar from '../components/NavBar/NavBar';

const Graphs: React.FunctionComponent = () => {
	const thisAuth = auth;
	const navigate = useNavigate();

	return (
		<div>
			<Navbar currentPage={'graphs'} />
			<h1>This is the My Graphs section, where your saved graphs are stored</h1>
			<Button
				data-testid={'sign-out'}
				onClick={() => {
					signOut(thisAuth)
						.then(() => {
							navigate('/');
						})
						.catch((error) => {
							/* istanbul ignore next */
							console.warn(error);
						});
				}}
			>
				Sign Out
			</Button>
		</div>
	);
};

export default Graphs;
