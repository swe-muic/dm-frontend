/* eslint-env jest */
import MinioClient from './MinioClient';
import CreateBucketService from './CreateBucketService';
import UploadScreenshotToMinio from './InsertObjectService';
import RetrieveObjectService from './RetrieveObjectService';
import { S3 } from '@aws-sdk/client-s3';
import { MinioConfig } from '../../config/MinioConfig';

describe('Test MinIo', () => {
	const bucketName = 'test-bucket';
	let blob: Blob;

	beforeAll(async () => {
		await CreateBucketService(bucketName);
		const url =
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

		await fetch(url)
			.then(async (res) => await res.blob())
			.then(async (b) => {
				blob = b;
			});
	});

	test('Test create bucket that does not exist', async () => {
		const anotherBucketName = 'non-existing-bucket';
		const result = await CreateBucketService(anotherBucketName);
		expect(result).toBe(true);

		await MinioClient.deleteBucket({ Bucket: anotherBucketName });
	});
	//
	test('Test create bucket that exists', async () => {
		const result2 = await CreateBucketService(bucketName);
		expect(result2).toBe(false);
	});

	test('create bucket with wrong API key', async () => {
		const minioOldSecretKey = MinioConfig.credentials.secretAccessKey;
		MinioConfig.credentials.secretAccessKey = 'wrong-key';
		const newMinioClient = new S3(MinioConfig);
		const result = await CreateBucketService(bucketName, newMinioClient);
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
		const result = await UploadScreenshotToMinio(blob ?? new Blob(), bucketName, fileName);
		expect(result).toBe(true);
		await MinioClient.deleteObject({ Bucket: bucketName, Key: `${fileName}.png` });
	});

	test('Try uploading screenshot to non-existing bucket', async () => {
		const bucketName = 'non-existing-bucket';
		const result = await UploadScreenshotToMinio(blob ?? new Blob(), bucketName, 'test-file');
		expect(result).toBe(false);
		await MinioClient.deleteBucket({ Bucket: bucketName });
	});

	test('try uploading image with wrong API key', async () => {
		const minioOldSecretKey = MinioConfig.credentials.secretAccessKey;
		MinioConfig.credentials.secretAccessKey = 'wrong-key';
		const uploadClient = new S3(MinioConfig);
		const fileName = 'test-file';
		const result = await UploadScreenshotToMinio(blob ?? new Blob(), bucketName, fileName, uploadClient);
		expect(result).toBe(false);
		MinioConfig.credentials.secretAccessKey = minioOldSecretKey;
	});

	test('Test retrieve object from MinIo', async () => {
		const fileName = 'test-file';
		await UploadScreenshotToMinio(blob ?? new Blob(), bucketName, fileName);

		const result = await RetrieveObjectService(bucketName, fileName);
		expect(result).toMatch(/^blob/);
		await MinioClient.deleteObject({ Bucket: bucketName, Key: `${fileName}.png` });
	});

	test('Test retrieve object from non-existing bucket', async () => {
		const result = await RetrieveObjectService('non-existing-bucket', 'test-file');
		expect(result).toBe('');
	});
});
