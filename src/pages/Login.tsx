import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FunctionComponent = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [authentication, setAuthentication] = useState(false);
	const signInWithGoogle = async (): Promise<void> => {
		setAuthentication(true);
		signInWithPopup(auth, new GoogleAuthProvider())
			.then((response) => {
				console.log(response.user.uid);
				navigate('/graphs');
			})
			.catch((error) => {
				console.log(error);
				setAuthentication(false);
			});
	};
	return (
		<div>
			<h1>This is the login page</h1>
			<div>
				<GoogleButton
					onClick={() => {
						void signInWithGoogle();
					}}
					disabled={authentication}
				/>
			</div>
		</div>
	);
};

export default Login;