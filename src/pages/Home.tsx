import React from 'react';
import Plot from '../components/Graph/GraphComponent';
import Navbar from '../components/NavBar/NavBar';
const data = [
	{
		fn: 'x^2',
	},
];
const Home: React.FunctionComponent = () => (
	<div>
		<Navbar />
		<Plot data={data} />
	</div>
);

export default Home;
