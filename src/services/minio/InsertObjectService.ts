import minioClient from './MinioClient';
import type MinioObjectInterface from '../../interfaces/MinioObjectInterface';
import { PutObjectCommand, type S3 } from '@aws-sdk/client-s3';

/*
This function uploads a screenshot to minio (takes a blob and converts it to a uint8Array that can be downloaded as PNG from minio)
	@param screenshot: Blob
	@param bucketName: string
	@param fileName: string
	@param client: S3
	@return Promise<boolean> whether the screenshot has been uploaded or not

	Blob: used when getting a screenshot from html2canvas via
		html2canvas(document.body).then((canvas) => {
			const screenshot = canvas.toBlob((blob) => {
				// plug the blob into this function
			});
		});
 */
const UploadScreenshotToMinio: (
	screenshot: Blob,
	bucketName: string,
	fileName: string,
	client?: S3,
) => Promise<boolean> = async (screenshot: Blob, bucketName: string, fileName: string, client?: S3) => {
	client = client ?? minioClient;
	const replacedSlashes = fileName.toLowerCase().replace('/', '__');
	const arrayBuffer = await screenshot.arrayBuffer();
	const uint8Array = new Uint8Array(arrayBuffer);
	bucketName = bucketName.toLowerCase();
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
