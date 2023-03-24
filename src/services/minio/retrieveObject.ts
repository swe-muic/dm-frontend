import minioClient from './minioClient';

/* eslint-disable import/prefer-default-export */
export const retrieveObject: (bucketName: string, fileName: string) => Promise<string> = async (
	bucketName,
	fileName,
) => {
	const object = await minioClient.getObject({ Bucket: bucketName, Key: `${fileName}.png` }).promise();
	const blob = new Blob([object.Body as ArrayBuffer], { type: object.ContentType });
	return URL.createObjectURL(blob);
};
