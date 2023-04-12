function GetRequestOptions<T>(body: T, method = 'POST'): RequestInit {
	return {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	};
}

export default GetRequestOptions;
