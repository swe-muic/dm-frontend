import minioClient from './MinioClient';
import { GetObjectCommand } from '@aws-sdk/client-s3';

const RetrieveObjectService: (bucketName: string, fileName: string) => Promise<string> = async (
	bucketName,
	fileName,
) => {
	try {
		const objectParams = {
			Bucket: bucketName,
			Key: `${fileName}.png`,
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
