import AWS from 'aws-sdk';

const minioClient = new AWS.S3({
	endpoint: 'http://localhost:9000',
	s3ForcePathStyle: true,
	credentials: {
		accessKeyId: process.env.REACT_APP_MINIO_ROOT_USER ?? '',
		secretAccessKey: process.env.REACT_APP_MINIO_ROOT_PASSWORD ?? '',
	},
});

export default minioClient;
