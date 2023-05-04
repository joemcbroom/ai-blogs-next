import { generatePostTitles } from '#/lib/openai/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const {
		spaceName,
		spaceDescription = '',
		numberToGenerate = 1,
	} = await req.json();
	if (!spaceName) {
		return NextResponse.json(
			{ error: 'No spaceName provided' },
			{ status: 400 }
		);
	}

	const titles = await generatePostTitles({
		spaceName,
		spaceDescription,
		numberToGenerate,
	});

	if (!titles) {
		return NextResponse.json({ error: 'No titles generated' }, { status: 500 });
	}

	return NextResponse.json({ titles });
}
