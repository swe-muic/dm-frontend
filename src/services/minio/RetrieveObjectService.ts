import minioClient from './MinioClient';
import { GetObjectCommand } from '@aws-sdk/client-s3';

/*
This service retrieves an object from minio
	@param bucketName: string
	@param fileName: string the name of the file (without the extension - by invariant when uploading
	, extension is always .png
	@return Promise<string> the url of the object (empty string if it cannot be retrieved)
 */
const RetrieveObjectService: (bucketName: string, fileName: string) => Promise<string> = async (
	bucketName,
	fileName,
) => {
	try {
		const objectParams = {
			Bucket: bucketName.toLowerCase(),
			Key: `${fileName.toLowerCase()}.png`,
		};
		const { Body } = await minioClient.send(new GetObjectCommand(objectParams));
		const stream = Body as ReadableStream<Uint8Array>;
		const blob = await new Response(stream).blob();
		return URL.createObjectURL(blob);
	} catch (error: unknown) {
		console.error('cannot retrieve', error);
		return '';
	}
};

export default RetrieveObjectService;
