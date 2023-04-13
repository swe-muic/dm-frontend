/* eslint-disable import/prefer-default-export */
// No point in testing this file.
/* istanbul ignore file */
export const MinioConfig = {
	endpoint: process.env.REACT_APP_MINIO_ENDPOINT ?? 'http://localhost:9000',
	forcePathStyle: true,
	region: 'ap-east=1',
	credentials: {
		accessKeyId: process.env.REACT_APP_MINIO_ROOT_USER ?? '',
		secretAccessKey: process.env.REACT_APP_MINIO_ROOT_PASSWORD ?? '',
	},
	s3ForcePathStyle: true, // Force the use of path-style URLs
	tls: false, // Set this to true if you want to use HTTPS
};
