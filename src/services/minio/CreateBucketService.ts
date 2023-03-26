import minioClient from './MinioClient';

/* eslint-disable import/prefer-default-export */
export const createBucket: (bucketName: string) => Promise<boolean> = async (bucketName: string) => {
	const client = minioClient;
	try {
		await client.headBucket({ Bucket: bucketName });
		return false;
	} catch (error: unknown) {
		if (error instanceof Error && error.name === 'NotFound') {
			await client.createBucket({ Bucket: bucketName });
			console.log('created bucket');
			return true;
		}
		console.log('cannot create bucket', error);
		return false;
	}
};
