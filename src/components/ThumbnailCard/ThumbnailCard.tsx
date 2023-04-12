import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
	image: string;
	title: string;
	linkUrl: string;
}

const ThumbnailCard: React.FC<Props> = ({ image, title, linkUrl }) => {
	const navigate = useNavigate();

	const handleCardClick = (): void => {
		navigate(linkUrl);
	};

	return (
		<Box sx={{ width: '100%', maxWidth: 250 }}>
			<Card sx={{ width: 250 }}>
				<CardActionArea onClick={handleCardClick}>
					<CardMedia component='img' height='150' title={title} alt={title} image={image} />
				</CardActionArea>
			</Card>
			<Typography gutterBottom variant='subtitle1' component='div' align='center' mt={1}>
				{title}
			</Typography>
		</Box>
	);
};

export default ThumbnailCard;
