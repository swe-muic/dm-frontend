import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/FirebaseConfig';

export interface IAuthRouteProps {
	children: React.ReactNode;
}
const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
	const { children } = props;
	const thisAuth = auth;
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const AuthCheck = onAuthStateChanged(thisAuth, (user) => {
		if (user != null) {
			setLoading(false);
		} else {
			navigate('/login');
		}
	});

	useEffect(() => {
		AuthCheck();
		return () => {
			AuthCheck();
		};
	}, [auth]);

	if (loading) return <p>loading....</p>;

	return <>{children}</>;
};

export default AuthRoute;
