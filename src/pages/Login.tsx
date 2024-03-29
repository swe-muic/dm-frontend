import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import login_background from '../images/login_background.png';
import Navbar from '../components/NavBar/NavBar';

const Login: React.FunctionComponent = () => {
	const thisAuth = auth;
	const navigate = useNavigate();
	const [authentication, setAuthentication] = useState(false);
	/* istanbul ignore next */
	const signInWithGoogle = async (): Promise<void> => {
		setAuthentication(true);
		signInWithPopup(thisAuth, new GoogleAuthProvider())
			.then((response) => {
				console.log(response.user.uid); //
				navigate('/');
			})
			.catch((error) => {
				console.log(error);
				setAuthentication(false);
			});
	};
	const loginStyle = {
		background: `url(${login_background})`,
		height: '94vh',
		color: 'white',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};
	return (
		<div>
			<Navbar currentPage={'login'} />
			<div style={loginStyle}>
				<div>
					<h1>Login</h1>
					<GoogleButton
						onClick={() => {
							/* istanbul ignore next */
							void signInWithGoogle();
						}}
						disabled={authentication}
					/>
				</div>
			</div>
		</div>
	);
};

export default Login;
