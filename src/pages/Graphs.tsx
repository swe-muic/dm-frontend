import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/FirebaseConfig';
import Button from '@mui/material/Button';
import Navbar from '../components/NavBar/NavBar';
import ThumbnailGrid from '../components/ThumbnailGrid/ThumbnailGrid';
import RetrieveObjectService from '../services/minio/RetrieveObjectService';

interface Image {
	image: string;
	title: string;
	linkUrl: string;
}

const images: Image[] = [
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
	{
		image: 'https://via.placeholder.com/500x500.png',
		title: 'Image 3',
		linkUrl: '/',
	},
];

const getImagesWithUrls = async (images: Image[]): Promise<Image[]> => {
	const urls = await Promise.all(
		images.map(async (img) => {
			const url = await RetrieveObjectService('test-bucket', 'stars');
			return url;
		}),
	);

	return images.map((img, idx) => ({
		...img,
		image: urls[idx].length === 0 ? 'https://via.placeholder.com/500x500.png' : urls[idx],
	}));
};

const Graphs: React.FunctionComponent = () => {
	const thisAuth = auth;
	const navigate = useNavigate();

	const [imagesWithUrls, setImagesWithUrls] = useState<Image[]>([]);

	useEffect(() => {
		getImagesWithUrls(images)
			.then((imagesWithUrls) => {
				setImagesWithUrls(imagesWithUrls);
			})
			.catch((error) => {
				console.error('Error fetching images with URLs:', error);
			});
	}, []);

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
							console.warn(error);
						});
				}}
			></Button>
			<div style={containerStyle}>
				<ThumbnailGrid images={imagesWithUrls} columns={4} />
			</div>
		</div>
	);
};

export default Graphs;
