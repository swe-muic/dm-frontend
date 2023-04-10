import { S3 } from '@aws-sdk/client-s3';
import { MinioConfig } from '../../config/MinioConfig';

/*
This is the client to connect to minio
The endpoint, access key, and secret key are set in the .env file based on the minio server's configuration
 */
const MinioClient = new S3(MinioConfig);

export default MinioClient;
