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
	</div>
);

export default Home;
