import minioClient from './MinioClient';
import type MinioObjectInterface from '../../interface/minio/minioObjectInterface';
import { PutObjectCommand } from '@aws-sdk/client-s3';

/* eslint-disable import/prefer-default-export */
export const uploadScreenshotToMinio: (
	screenshot: Blob,
	bucketName: string,
	fileName: string,
) => Promise<boolean> = async (screenshot: Blob, bucketName: string, fileName: string) => {
	const replacedSlashes = fileName.replace('/', '__');
	const arrayBuffer = await screenshot.arrayBuffer();
	const uint8Array = new Uint8Array(arrayBuffer);

	try {
		await minioClient.headBucket({ Bucket: bucketName });
		const objectParams: MinioObjectInterface = {
			Bucket: bucketName,
			Key: `${fileName}.png`,
			Body: uint8Array,
			ContentType: 'image/png',
			ACL: 'public-read',
			ContentDisposition: `attachment; filename= ${replacedSlashes} .png`,
			overwrite: true,
		};
		// await minioClient.putObject(objectParams);
		const command = new PutObjectCommand(objectParams);

		await minioClient.send(command);
		return true;
	} catch (error: unknown) {
		console.log(error);
		if (error instanceof Error && 'statusCode' in error && error.statusCode === 404) {
			await minioClient.createBucket({ Bucket: bucketName });
		}
		return false;
	}
};

// export uploadScreenshotToMinio;
