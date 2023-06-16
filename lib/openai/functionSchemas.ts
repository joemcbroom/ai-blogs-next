import type { ChatCompletionFunctions } from 'openai';

export const similarPostsByDescription: ChatCompletionFunctions = {
	name: 'findSimilarPostsByDescriptions',
	description: 'Find similar posts by descriptions',
	parameters: {
		type: 'object',
		properties: {
			post: {
				type: 'object',
				properties: {
					title: { type: 'string' },
					description: { type: 'string' },
					space_title: { type: 'string' },
					slug: { type: 'string' },
				},
			},
			posts: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						title: { type: 'string' },
						description: { type: 'string' },
						space_title: { type: 'string' },
						slug: { type: 'string' },
					},
				},
			},
		},
	},
};
