import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/FirebaseConfig';
import Button from '@mui/material/Button';
import Navbar from '../components/NavBar/NavBar';
import ThumbnailGrid from '../components/ThumbnailGrid/ThumbnailGrid';
import RetrieveObjectService from '../services/minio/RetrieveObjectService';
import GetAllUserGraphs from '../services/api/GetAllUserGraphsService';

interface Image {
	image: string;
	title: string;
	linkUrl: string;
}

const Graphs: React.FunctionComponent = () => {
	const thisAuth = auth;
	const navigate = useNavigate();

	const [images, setImages] = useState<Image[]>([]);

	useEffect(() => {
		const fetchImages = async (): Promise<void> => {
			try {
				const userGraphs = await GetAllUserGraphs(auth.currentUser?.uid ?? '');
				const imagesWithUrls: Image[] = await Promise.all(
					userGraphs.map(async (graph) => {
						const url = await RetrieveObjectService(`user-${graph.owner}-bucket`, graph.preview);
						return {
							image: url.length === 0 ? 'https://via.placeholder.com/500x500.png' : url,
							title: graph.name,
							linkUrl: `/?gid=${graph.id}`,
						};
					}),
				);
				setImages(imagesWithUrls);
			} catch (error) {
				console.error(error);
			}
		};
		void fetchImages();
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
		paddingLeft: '12%',
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
				<ThumbnailGrid images={images} columns={4} />
			</div>
		</div>
	);
};

export default Graphs;
