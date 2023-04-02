/* eslint-disable */
import React from 'react';
import Plot from '../components/Graph/GraphComponent';

const data = [
	{
		fn: 'x^2',
	},
];
const Home: React.FunctionComponent = () => (
	<div>
		<Plot data={data} />
		{/*<h1>This is the home page</h1>*/}
	</div>
);

export default Home;
