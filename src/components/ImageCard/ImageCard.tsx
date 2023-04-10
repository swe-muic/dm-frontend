import React from 'react';

interface ImageCardProps {
	imageSrc: string;
	imageAlt: string;
	linkUrl: string;
	linkText: string;
}

const ImageCard: React.FunctionComponent<ImageCardProps> = ({ imageSrc, imageAlt, linkUrl, linkText }) => (
	<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
		<a href={linkUrl} style={{ flex: 1 }}>
			<img src={imageSrc} alt={imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
		</a>
		<p style={{ textAlign: 'center', margin: '5px 0' }}>{linkText}</p>
	</div>
);

export default ImageCard;
