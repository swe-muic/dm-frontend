import { createBucket } from './CreateBucketService';
import { uploadScreenshotToMinio } from './InsertObjectService';
import { retrieveObjectService } from './RetrieveObjectService';

export default { createBucket, uploadScreenshotToMinio, retrieveObject: retrieveObjectService };
