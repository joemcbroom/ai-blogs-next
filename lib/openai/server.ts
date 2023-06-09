import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY!,
});

const LANGUAGE_MODEL = process.env.OPENAI_LANGUAGE_MODEL || 'gpt-3.5-turbo';

export const openai = new OpenAIApi(config);

export const generateSpaceDescription = async (name: string) => {
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
				content: `Write a description for a blog called ${name}.  It should be short and succint, like the type used for meta description and SEO.`,
			},
		],
	});
	return data.choices[0]?.message?.content;
};

export const generatePostTitles = async ({
	spaceName,
	spaceDescription = '',
	numberToGenerate = 1,
}: {
	spaceName: string;
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
				content: `Write ${numberToGenerate} titles of posts for a blog called ${spaceName}. ${
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
