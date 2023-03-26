import minioClient from './MinioClient';
import { GetObjectCommand } from '@aws-sdk/client-s3';

/* eslint-disable import/prefer-default-export */
export const retrieveObjectService: (bucketName: string, fileName: string) => Promise<string> = async (
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
		console.log('cannot retrieve', error);
		return '';
	}
};
