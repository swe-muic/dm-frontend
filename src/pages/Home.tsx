import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

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
