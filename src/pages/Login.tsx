import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import login_background from '../images/login_background.png';

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
	const loginStyle = {
		background: `url(${login_background})`,
		height: '100vh',
		marginTop: '10px',
		color: 'white',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};
	return (
		<div style={loginStyle}>
			<div>
				<h1>Login</h1>
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
