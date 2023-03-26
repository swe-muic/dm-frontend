/* eslint-disable import/prefer-default-export */
export const MinioConfig = {
	endpoint: process.env.REACT_APP_MINIO_ENDPOINT ?? 'http://localhost:9000',
	forcePathStyle: true,
	region: 'us-east-1',
	credentials: {
		accessKeyId: process.env.REACT_APP_MINIO_ROOT_USER ?? '',
		secretAccessKey: process.env.REACT_APP_MINIO_ROOT_PASSWORD ?? '',
	},
};
