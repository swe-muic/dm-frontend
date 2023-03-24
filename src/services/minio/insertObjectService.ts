import minioClient from './minioClient';
import type MinioObjectInterface from '../../interface/minio/minioObjectInterface';

/* eslint-disable import/prefer-default-export */
export const uploadScreenshotToMinio: (
	screenshot: Blob,
	bucketName: string,
	fileName: string,
) => Promise<void> = async (screenshot: Blob, bucketName: string, fileName: string) => {
	const replacedSlashes = fileName.replace('/', '__');
	try {
		await minioClient.headBucket({ Bucket: bucketName }).promise();
		const objectParams: MinioObjectInterface = {
			Bucket: bucketName,
			Key: `${fileName}.png`,
			Body: screenshot,
			ContentType: 'image/png',
			ACL: 'public-read',
			ContentDisposition: `attachment; filename= ${replacedSlashes} .png`,
			overwrite: true,
		};
		await minioClient.upload(objectParams).promise();
	} catch (error: unknown) {
		if (error instanceof Error && 'statusCode' in error && error.statusCode === 404) {
			await minioClient.createBucket({ Bucket: bucketName }).promise();
			console.log('bucket does not exist');
		}
	}
};

// export uploadScreenshotToMinio;
