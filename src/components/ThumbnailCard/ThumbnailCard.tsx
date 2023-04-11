import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface Props {
	image: string;
	title: string;
}

const ThumbnailCard: React.FC<Props> = ({ image, title }) => (
	<Box sx={{ width: '100%', maxWidth: 250 }}>
		<Card sx={{ width: 250 }}>
			<CardActionArea>
				<CardMedia component='img' height='150' title={title} alt={title} image={image} />
			</CardActionArea>
		</Card>
		<Typography gutterBottom variant='subtitle1' component='div' align='center' mt={1}>
			{title}
		</Typography>
	</Box>
);

export default ThumbnailCard;
