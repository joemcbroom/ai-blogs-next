import { NextResponse } from 'next/server';
import { generateSpaceDescription } from '#/lib/openai/server';

export async function POST(req: Request) {
	const { title } = await req.json();
	if (!title) {
		return NextResponse.json({ error: 'No title provided' }, { status: 400 });
	}

	const description = await generateSpaceDescription(title);

	if (!description) {
		return NextResponse.json(
			{ error: 'No description generated' },
			{ status: 500 }
		);
	}

	return NextResponse.json({ description });
}
