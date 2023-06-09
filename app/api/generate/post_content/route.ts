import { generatePostContent } from '#/lib/openai/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const { title, description, space_title, space_description, content_length } =
		await req.json();

	if (!title) {
		return NextResponse.json({ error: 'No title provided' }, { status: 400 });
	}

	const content = await generatePostContent({
		title,
		description,
		space_title,
		space_description,
		content_length,
	});

	if (!content) {
		return NextResponse.json(
			{ error: 'No content generated' },
			{ status: 500 }
		);
	}

	return NextResponse.json({ content });
}
