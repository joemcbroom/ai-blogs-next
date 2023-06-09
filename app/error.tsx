'use client';

import Error from '#/components/UI/Error';

export default function ErrorPage({ error, reset }: any) {
	return <Error error={error} reset={reset} />;
}
