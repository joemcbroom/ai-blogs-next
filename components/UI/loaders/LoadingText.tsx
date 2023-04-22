import css from './LoadingText.module.css';
export default function LoadingText({
	startingText = 'Loading',
}: {
	startingText?: string;
}) {
	return <span className={css.loading}>{startingText}</span>;
}
