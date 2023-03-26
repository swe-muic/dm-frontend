import minioClient from './MinioClient';
import { type S3 } from '@aws-sdk/client-s3';

/* eslint-disable import/prefer-default-export */
export const createBucket: (bucketName: string, client?: S3) => Promise<boolean> = async (
	bucketName: string,
	client?: S3,
) => {
	client = client ?? minioClient;
	try {
		await client.headBucket({ Bucket: bucketName });
		return false;
	} catch (error: unknown) {
		if (error instanceof Error && error.name === 'NotFound') {
			await client.createBucket({ Bucket: bucketName });
			return true;
		}
		return false;
	}
};
