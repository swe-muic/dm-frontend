function GetRequestOptions<T>(body: T, method = 'POST'): RequestInit {
	return {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		mode: 'cors',
		body: JSON.stringify(body),
	};
}

export default GetRequestOptions;
