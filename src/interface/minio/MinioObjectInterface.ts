interface MinioObjectInterface {
	Bucket: string;
	Key: string;
	Body: string | Uint8Array;
	ContentType: string;
	ACL?: string;
	ContentDisposition?: string;
	overwrite?: boolean;
}

export default MinioObjectInterface;
