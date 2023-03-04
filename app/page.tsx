import PendulumsViz from '#/components/PendulumsViz';

export default function Page() {
	return (
		<>
			<PendulumsViz n={10} width={600} interval={100} />
		</>
	);
}
