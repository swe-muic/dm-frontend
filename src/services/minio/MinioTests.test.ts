/* eslint-env jest */
import { createBucket } from './CreateBucketService';
import { uploadScreenshotToMinio } from './InsertObjectService';
import { retrieveObjectService } from './RetrieveObjectService';
import minioClient from './MinioClient';
import { S3 } from '@aws-sdk/client-s3';
import { MinioConfig } from '../../config/MinioConfig';

describe('Test MinIo', () => {
	const bucketName = 'test-bucket';
	let blob: Blob;

	beforeAll(async () => {
		await createBucket(bucketName);
		const url =
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

		await fetch(url)
			.then(async (res) => await res.blob())
			.then(async (b) => {
				blob = b;
			});

		try {
			await minioClient.headBucket({ Bucket: 'non-existing-bucket' });
			await minioClient.deleteBucket({ Bucket: 'non-existing-bucket' });
		} catch (error: unknown) {
			console.log('non-existing-bucket does not exist');
		}

		await minioClient.deleteObject({ Bucket: bucketName, Key: 'test-file.png' });
	});

	test('Test create bucket that does not exist', async () => {
		const anotherBucketName = 'non-existing-bucket';
		const result = await createBucket(anotherBucketName);
		expect(result).toBe(true);

		await minioClient.deleteBucket({ Bucket: anotherBucketName });
	});
	//
	test('Test create bucket that exists', async () => {
		const result2 = await createBucket(bucketName);
		expect(result2).toBe(false);
	});

	test('create bucket with wrong API key', async () => {
		const minioOldSecretKey = MinioConfig.credentials.secretAccessKey;
		MinioConfig.credentials.secretAccessKey = 'wrong-key';
		const newMinioClient = new S3(MinioConfig);
		const result = await createBucket(bucketName, newMinioClient);
		expect(result).toBe(false);
		MinioConfig.credentials.secretAccessKey = minioOldSecretKey;
	});

	/* NOTE: in order to actually implement the screenshot you need to use html2canvas
	await html2canvas(document.body).then(async (canvas) => {
		canvas.toBlob((blob) => {
	instead of using the fetch url below
 	*/
	test('Test upload screenshot to MinIo', async () => {
		const fileName = 'test-file';
		const result = await uploadScreenshotToMinio(blob ?? new Blob(), bucketName, fileName);
		expect(result).toBe(true);
		await minioClient.deleteObject({ Bucket: bucketName, Key: `${fileName}.png` });
	});

	test('Try uploading screenshot to non-existing bucket', async () => {
		const bucketName = 'non-existing-bucket';
		const result = await uploadScreenshotToMinio(blob ?? new Blob(), bucketName, 'test-file');
		expect(result).toBe(false);
		await minioClient.deleteBucket({ Bucket: bucketName });
	});

	test('try uploading image with wrong API key', async () => {
		const minioOldSecretKey = MinioConfig.credentials.secretAccessKey;
		MinioConfig.credentials.secretAccessKey = 'wrong-key';
		const uploadClient = new S3(MinioConfig);
		const fileName = 'test-file';
		const result = await uploadScreenshotToMinio(blob ?? new Blob(), bucketName, fileName, uploadClient);
		expect(result).toBe(false);
		MinioConfig.credentials.secretAccessKey = minioOldSecretKey;
	});

	test('Test retrieve object from MinIo', async () => {
		const fileName = 'test-file';
		await uploadScreenshotToMinio(blob ?? new Blob(), bucketName, fileName);

		const result = await retrieveObjectService(bucketName, fileName);
		expect(result).toMatch(/^blob/);
		await minioClient.deleteObject({ Bucket: bucketName, Key: `${fileName}.png` });
	});

	test('Test retrieve object from non-existing bucket', async () => {
		const result = await retrieveObjectService('non-existing-bucket', 'test-file');
		expect(result).toBe('');
	});
});
