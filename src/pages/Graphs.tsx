import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/FirebaseConfig';
import Button from '@mui/material/Button';
import Navbar from '../components/NavBar/NavBar';
import ImageGrid from '../components/ImageGrid/ImageGrid';

const images = [
	{
		src: 'https://via.placeholder.com/500x500.png',
		alt: 'Image 1',
		linkUrl: 'https://example.com',
		linkText: 'Image 1 Link',
	},
	{
		src: 'https://via.placeholder.com/500x500.png',
		alt: 'Image 2',
		linkUrl: 'https://example.com',
		linkText: 'Image 2 Link',
	},
	{
		src: 'https://via.placeholder.com/500x500.png',
		alt: 'Image 3',
		linkUrl: 'https://example.com',
		linkText: 'Image 3 Link',
	},
	{
		src: 'https://via.placeholder.com/500x500.png',
		alt: 'Image 4',
		linkUrl: 'https://example.com',
		linkText: 'Image 4 Link',
	},
	{
		src: 'https://via.placeholder.com/500x500.png',
		alt: 'Image 5',
		linkUrl: 'https://example.com',
		linkText: 'Image 5 Link',
	},
	{
		src: 'https://via.placeholder.com/500x500.png',
		alt: 'Image 6',
		linkUrl: 'https://example.com',
		linkText: 'Image 6 Link',
	},
	{
		src: 'https://via.placeholder.com/500x500.png',
		alt: 'Image 7',
		linkUrl: 'https://example.com',
		linkText: 'Image 7 Link',
	},
	{
		src: 'https://via.placeholder.com/500x500.png',
		alt: 'Image 8',
		linkUrl: 'https://example.com',
		linkText: 'Image 8 Link',
	},
];

const Graphs: React.FunctionComponent = () => {
	const thisAuth = auth;
	const navigate = useNavigate();

	const headerContainerStyle = {
		display: 'flex',
		paddingLeft: '8%',
		paddingTop: '1%',
		paddingBottom: '2%',
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
							console.warn(error);
						});
				}}
			></Button>
			<div style={containerStyle}>
				<ImageGrid images={images} columns={4} />
			</div>
		</div>
	);
};

export default Graphs;
