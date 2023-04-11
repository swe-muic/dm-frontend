import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/FirebaseConfig';
import Button from '@mui/material/Button';
import Navbar from '../components/NavBar/NavBar';
import ThumbnailGrid from '../components/ThumbnailGrid/ThumbnailGrid';

const images = [
	{
		image: 'https://via.placeholder.com/500x500.png',
		title: 'Image 1',
		linkUrl: '/',
	},
	{
		image: 'https://via.placeholder.com/500x500.png',
		title: 'Image 2',
		linkUrl: '/',
	},
];

const Graphs: React.FunctionComponent = () => {
	const thisAuth = auth;
	const navigate = useNavigate();

	const headerContainerStyle = {
		display: 'flex',
		paddingLeft: '8%',
		paddingTop: '1%',
		paddingBottom: '1%',
		fontFamily: 'Monospace',
		fontSize: '40px',
		fontWeight: 'Normal',
	};

	const containerStyle = {
		display: 'flex',
		justifyContent: 'center',
		paddingLeft: '11%',
		paddingRight: '11%',
	};

	return (
		<div>
			<Navbar currentPage={'graphs'} />
			<h1 style={headerContainerStyle}>My Graph</h1>
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
			></Button>
			<div style={containerStyle}>
				<ThumbnailGrid images={images} columns={4} />
			</div>
		</div>
	);
};

export default Graphs;
