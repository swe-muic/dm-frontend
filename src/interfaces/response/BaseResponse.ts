interface BaseResponse {
	status: number;
	message: string;
	data: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default BaseResponse;
