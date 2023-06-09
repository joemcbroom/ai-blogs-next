'use client';

import useAuthRedirect from '#/lib/hooks/useAuthRedirect';

export default function Authenticating() {
	useAuthRedirect();

	return <span className="text-2xl">Authenticating...</span>;
}
