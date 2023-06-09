'use client';

import { useEffect } from 'react';

const Error = ({ error, reset }) => {
	useEffect(() => {
		// Log the error to an error reporting service
		console.log('hello from error boundary');
		console.error(error);
	}, [error]);

	return (
		<div>
			<p>Something went wrong!</p>
			<button onClick={() => reset()}>Reset error boundary</button>
		</div>
	);
};

export default Error;
