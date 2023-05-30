import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY!,
});

const LANGUAGE_MODEL = process.env.OPENAI_LANGUAGE_MODEL || 'gpt-3.5-turbo';

export const openai = new OpenAIApi(config);

export const generateSpaceDescription = async (title: string) => {
	const { data } = await openai.createChatCompletion({
		model: LANGUAGE_MODEL,
		messages: [
			{
				role: 'system',
				content:
					'You are an expert content writer for a blog. Omit quotation marks, extra details, and explanations from responses.',
			},
			{
				role: 'user',
				content: `Write a description for a blog called ${title}.  It should be short and succint, like the type used for meta description and SEO.`,
			},
		],
	});
	return data.choices[0]?.message?.content;
};

interface PostContentParams {
	title: string;
	description?: string;
	space_title?: string;
	space_description?: string;
	content_length?: string;
}
export const generatePostContent = async ({
	title,
	description = '',
	space_title = '',
	space_description = '',
	content_length = '500',
}: PostContentParams) => {
	let contentString = `Write a blog post titled ${title}`;
	if (space_title) contentString += ` for a blog called ${space_title}`;
	if (space_description)
		contentString += `. The blog description is: ${space_description}`;
	if (description) contentString += `. The post description is: ${description}`;
	contentString += `.  Format the blog post as html.  It should be ${content_length} words long.`;

	const { data } = await openai.createChatCompletion({
		model: LANGUAGE_MODEL,
		messages: [
			{
				role: 'system',
				content:
					'You are an expert content writer for a blog. Omit extra details or superfulous explanations. Format blog posts as HTML. Do NOT include HTML, head, body, or style tags',
			},
			{
				role: 'user',
				content: contentString,
			},
		],
	});
	const content = data.choices[0]?.message?.content;
	if (!content) throw new Error('No content generated');
	return content;
};

export const generatePostTitles = async ({
	spaceTitle,
	spaceDescription = '',
	numberToGenerate = 1,
}: {
	spaceTitle: string;
	spaceDescription?: string;
	numberToGenerate?: number;
}) => {
	const { data } = await openai.createChatCompletion({
		model: LANGUAGE_MODEL,
		messages: [
			{
				role: 'system',
				content:
					'You are an expert content writer for a blog. Omit extra details or superfulous explanations',
			},
			{
				role: 'user',
				content: `Write ${numberToGenerate} titles of posts for a blog called ${spaceTitle}. ${
					spaceDescription ? `The blog description is: ${spaceDescription}` : ''
				}`,
			},
		],
	});
	const titles = data.choices[0]?.message?.content;
	if (!titles) throw new Error('No titles generated');
	return fixTitles(titles);
};

const fixTitles = async (titles: string) => {
	const { data } = await openai.createChatCompletion({
		model: LANGUAGE_MODEL,
		messages: [
			{
				role: 'system',
				content:
					'You are a helpful AI assistant. Omit extra details or superfulous explanations',
			},
			{
				role: 'user',
				content: `Fix this string by removing any numbered bullets and newlines, and format as an array of strings: ${titles}`,
			},
		],
	});
	const fixedTitles = data.choices[0]?.message?.content as string;
	return JSON.parse(fixedTitles);
};

/** Class for ChatGPTChat */
/** could be used to maintain a conversation (iterate responses?) */
// export class ChatGPTChat {
//   private openai: OpenAIApi;
//   private model: string;
//   private conversation: ChatCompletionRequestMessage[];

//   constructor() {
//     this.openai = openai;
//     this.model = LANGUAGE_MODEL;
//     this.conversation = [defaultSystemRoleMessage];
//   }

//   async sendMessage(messageContent: string): Promise<string> {
//     const message = {
//       role: 'user',
//       content: messageContent,
//     } satisfies ChatCompletionRequestMessage;
//     this.conversation.push(message);
//     const { data } = await this.openai.createChatCompletion({
//       model: this.model,
//       messages: this.conversation,
//     });
//     const response = data.choices[0]?.message?.content;
//     if (!response)
//       throw new Error('No response from OpenAI');

//     this.conversation.push({
//       role: 'assistant',
//       content: response,
//     } satisfies ChatCompletionRequestMessage);

//     return response;
//   }
// }
