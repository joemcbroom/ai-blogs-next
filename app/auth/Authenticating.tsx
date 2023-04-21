'use client';

import useAuthRedirect from '#/lib/hooks/useAuthRedirect';
import TypeIt from 'typeit-react';

export default function Authenticating() {
	useAuthRedirect();

	return <span className="text-2xl">Authenticating...</span>;
}
