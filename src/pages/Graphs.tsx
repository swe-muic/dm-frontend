import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Graphs: React.FunctionComponent = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	return (
		<div>
			<h1>This is the My Graphs section, where your saved graphs are stored</h1>
			<button
				onClick={() => {
					void signOut(auth).then(() => {
						navigate('/');
					});
				}}
			>
				Sign Out
			</button>
		</div>
	);
};

export default Graphs;