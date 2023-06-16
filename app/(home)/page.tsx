import Link from 'next/link';

const HomePage = () => {
	return (
		<div>
			Home Page
			<Link href="/spaces">Spaces</Link>
		</div>
	);
};

export default HomePage;
