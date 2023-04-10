import minioClient from './MinioClient';
import type MinioObjectInterface from '../../interface/minio/MinioObjectInterface';
import { PutObjectCommand, type S3 } from '@aws-sdk/client-s3';

const UploadScreenshotToMinio: (
	screenshot: Blob,
	bucketName: string,
	fileName: string,
	client?: S3,
) => Promise<boolean> = async (screenshot: Blob, bucketName: string, fileName: string, client?: S3) => {
	client = client ?? minioClient;
	const replacedSlashes = fileName.replace('/', '__');
	const arrayBuffer = await screenshot.arrayBuffer();
	const uint8Array = new Uint8Array(arrayBuffer);

	try {
		await client.headBucket({ Bucket: bucketName });
		const objectParams: MinioObjectInterface = {
			Bucket: bucketName,
			Key: `${fileName}.png`,
			Body: uint8Array,
			ContentType: 'image/png',
			ACL: 'public-read',
			ContentDisposition: `attachment; filename= ${replacedSlashes} .png`,
			overwrite: true,
		};
		const command = new PutObjectCommand(objectParams);

		await client.send(command);
		return true;
	} catch (error: unknown) {
		if (error instanceof Error && error.name === 'NotFound') {
			await client.createBucket({ Bucket: bucketName });
		}
		return false;
	}
};

export default UploadScreenshotToMinio;
// export uploadScreenshotToMinio;
