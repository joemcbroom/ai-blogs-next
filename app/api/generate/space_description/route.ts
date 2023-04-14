import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	/* get the data from the body of the request */
	/* send to the chat-gpt api (sdk?) */
	// const res = await fetch('chat-gpt.com', {
	// 	headers: {
	// 		method: 'POST',
	// 		'Content-Type': 'application/json',
	// 		'API-Key': process.env.DATA_API_KEY,
	// 	},
	// 	body: JSON.stringify({ time: new Date().toISOString() }),
	// });
	// const data = await res.json();
	// return NextResponse.json(data);
}
