import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

interface Props {
	image: string;
	title: string;
	description: string;
}

const ThumbnailCard: React.FC<Props> = ({ image, title, description }) => (
	<Card sx={{ width: 350 }}>
		<CardActionArea>
			<CardMedia component='img' height='100' title={title} alt={title} image={image} />
			<CardContent sx={{ textAlign: 'left' }}>
				<Typography gutterBottom variant='h6' component='div'>
					{title}
				</Typography>
				<Typography variant='subtitle1' color='text.secondary'>
					{description}
				</Typography>
			</CardContent>
		</CardActionArea>
	</Card>
);

export default ThumbnailCard;
