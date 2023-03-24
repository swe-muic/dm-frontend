interface MinioObjectInterface {
	Bucket: string;
	Key: string;
	Body: string | Blob;
	ContentType: string;
	ACL?: string;
	ContentDisposition?: string;
	overwrite?: boolean;
}

export default MinioObjectInterface;
