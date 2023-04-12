import type BaseResponse from './BaseResponse';

interface ErrorResponseInterface extends BaseResponse {
	data: {
		detail: string;
	};
}
export function isErrorResponseInterface(object: BaseResponse): object is ErrorResponseInterface {
	return 'detail' in object.data || false;
}

export default ErrorResponseInterface;
