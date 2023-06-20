'use client';

import { notFound } from 'next/navigation';

export default function ErrorPage({ error, reset }: any) {
	return notFound();
}
