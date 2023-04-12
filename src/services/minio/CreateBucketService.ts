import minioClient from './MinioClient';
import { type S3 } from '@aws-sdk/client-s3';

/*
This function creates a bucket if it does not exist
	@param bucketName: string
	@param client: S3
	@return Promise<boolean> whether the bucket has been created or not
 */
const CreateBucket: (bucketName: string, client?: S3) => Promise<boolean> = async (bucketName: string, client?: S3) => {
	client = client ?? minioClient;
	bucketName = bucketName.toLowerCase();
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

export default CreateBucket;
