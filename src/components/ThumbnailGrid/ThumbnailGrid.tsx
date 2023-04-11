import React from 'react';
import Grid from '@mui/material/Grid';

import ThumbnailCard from '../ThumbnailCard/ThumbnailCard';

interface Props {
	images: Array<{
		image: string;
		title: string;
		linkUrl: string;
	}>;
	columns?: number;
}

const ThumbnailGrid: React.FC<Props> = ({ images, columns = 4 }) => (
	<Grid container spacing={2}>
		{images.map((image, index) => (
			<Grid item xs={12} sm={6} md={12 / columns} key={index}>
				<ThumbnailCard image={image.image} title={image.title} linkUrl={image.linkUrl} />
			</Grid>
		))}
	</Grid>
);

export default ThumbnailGrid;
