import type BaseResponse from './BaseResponse';

interface ErrorResponseInterface extends BaseResponse {
	data: {
		detail: string;
	};
}

// is Error Response Interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isErrorResponseInterface(object: BaseResponse): object is ErrorResponseInterface {
	return 'detail' in object.data || false;
}

export default ErrorResponseInterface;
