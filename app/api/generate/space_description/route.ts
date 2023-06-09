import { NextResponse } from 'next/server';
import { generateSpaceDescription } from '#/lib/openai/server';

export async function POST(req: Request) {
	const { name } = await req.json();
	if (!name) {
		return NextResponse.json({ error: 'No name provided' }, { status: 400 });
	}

	const description = await generateSpaceDescription(name);

	if (!description) {
		return NextResponse.json(
			{ error: 'No description generated' },
			{ status: 500 }
		);
	}

	return NextResponse.json({ description });
}
