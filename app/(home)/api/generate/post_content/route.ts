import { generatePostContent } from '#/lib/openai/server';
import { NextResponse } from 'next/server';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 * 60 }); // 1 hour max cache

type PostContentParams = {
	title: string;
	description?: string;
	space_title?: string;
	space_description?: string;
	content_length?: string;
};

const generateAndCachePostContent = async (params: PostContentParams) => {
	const cacheKey = `${params.space_title}-${params.title}`;
	const content = await generatePostContent(params);
	cache.set(cacheKey, content);
};

const getAndDeleteCachedPostContent = (space_title: string, title: string) => {
	const cacheKey = `${space_title}-${title}`;
	const content = cache.get(cacheKey);
	if (content) {
		cache.del(cacheKey);
		return content;
	}
	return null;
};

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const title = searchParams.get('title');
	const space_title = searchParams.get('space_title');
	if (!title || !space_title) {
		return NextResponse.json(
			{ error: 'No title or space_title provided' },
			{ status: 400 }
		);
	}

	const cachedContent = getAndDeleteCachedPostContent(space_title, title);
	if (cachedContent) {
		return NextResponse.json({ content: cachedContent });
	}

	return NextResponse.json({ content: null });
}

export async function POST(req: Request) {
	const { title, description, space_title, space_description, content_length } =
		await req.json();

	if (!title) {
		return NextResponse.json({ error: 'No title provided' }, { status: 400 });
	}

	generateAndCachePostContent({
		title,
		description,
		space_title,
		space_description,
		content_length,
	});

	return NextResponse.json({ success: true });
}
