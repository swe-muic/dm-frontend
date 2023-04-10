import React from 'react';
import ImageCard from '../ImageCard/ImageCard';

interface ImageGridProps {
	images: Array<{
		src: string;
		alt: string;
		linkUrl: string;
		linkText: string;
	}>;
	columns?: number;
}

const ImageGrid: React.FunctionComponent<ImageGridProps> = ({ images, columns = 3 }) => {
	const rows = Math.ceil(images.length / columns);

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
		gridTemplateRows: `repeat(${rows}, 1fr)`,
		gap: '16px',
	};

	return (
		<div style={gridStyle}>
			{images.map((image, index) => (
				<ImageCard
					key={index}
					imageSrc={image.src}
					imageAlt={image.alt}
					linkUrl={image.linkUrl}
					linkText={image.linkText}
				/>
			))}
		</div>
	);
};

export default ImageGrid;
