import { generatePostTitles } from '#/lib/openai/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const {
		spaceTitle,
		spaceDescription = '',
		numberToGenerate = 1,
	} = await req.json();
	if (!spaceTitle) {
		return NextResponse.json(
			{ error: 'No spaceTitle provided' },
			{ status: 400 }
		);
	}

	const titles = await generatePostTitles({
		spaceTitle,
		spaceDescription,
		numberToGenerate,
	});

	if (!titles) {
		return NextResponse.json({ error: 'No titles generated' }, { status: 500 });
	}

	return NextResponse.json({ titles });
}
