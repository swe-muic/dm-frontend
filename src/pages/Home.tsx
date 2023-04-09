import React from 'react';
import Plot from '../components/Graph/GraphComponent';
import Navbar from '../components/NavBar/NavBar';

const Home: React.FunctionComponent = () => (
	<div>
		<Navbar currentPage={'home'} />
		<Plot data={[]} />
	</div>
);

export default Home;
