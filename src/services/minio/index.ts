import { createBucket } from './createBucketService';
import { uploadScreenshotToMinio } from './insertObjectService';
import { retrieveObject } from './retrieveObject';

export default { createBucket, uploadScreenshotToMinio, retrieveObject };
