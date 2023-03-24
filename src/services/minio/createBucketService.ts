import minioClient from './minioClient';

/* eslint-disable import/prefer-default-export */
export const createBucket: (bucketName: string) => Promise<void> = async (bucketName: string) => {
	const client = minioClient;
	try {
		await client.headBucket({ Bucket: bucketName }).promise();
		console.log('bucket already exists');
	} catch (error: unknown) {
		if (error instanceof Error && 'statusCode' in error && error.statusCode === 404) {
			await client.createBucket({ Bucket: bucketName }).promise();
			console.log('bucket created');
		}
	}
};
