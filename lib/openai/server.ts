import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY!,
});

const LANGUAGE_MODEL = process.env.OPENAI_LANGUAGE_MODEL || 'gpt-3.5-turbo';

export const openai = new OpenAIApi(config);

export const generateSpaceDescription = async (name: string) => {
	debugger;
	const { data } = await openai.createChatCompletion({
		model: LANGUAGE_MODEL,
		messages: [
			defaultSystemRoleMessage,
			{
				role: 'user',
				content: buildPrompts.spaceDescription(name),
			},
		],
	});
	return data.choices[0]?.message?.content;
};

const buildPrompts = {
	spaceDescription: (name: string) => {
		return `Write a description for a blog called ${name}.  It should be short and succint, like the type used for meta description and SEO.`;
	},
};

const defaultSystemRoleMessage: ChatCompletionRequestMessage = {
	role: 'system',
	content:
		'You are an expert content writer for a blog. Omit quotation marks, extra details, and explanations from responses.',
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
