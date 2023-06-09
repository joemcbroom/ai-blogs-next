import TypeIt from 'typeit-react';

const PHRASES = [
	'Wake up Neo...',
	"I've been looking for you...",
	'The Matrix has you...',
	'Follow the white rabbit...',
	'Knock, knock, Neo...',
];

export default function TypeWriter() {
	return (
		<div className="bubble relative min-h-fit min-w-[3.55rem] px-4 py-2 rounded-xl bg-white">
			<TypeIt
				options={{
					speed: 100,
					loop: true,
				}}
				getBeforeInit={(instance) => {
					PHRASES.forEach((phrase, index) => {
						instance.type(phrase).pause(100).delete().pause(100);
					});
					return instance;
				}}
			/>
		</div>
	);
}
