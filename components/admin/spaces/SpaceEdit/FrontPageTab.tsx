import Link from 'next/link';

const FrontPageTab = ({ children }: { children: JSX.Element }): JSX.Element => {
	return (
		<>
			<h2 className="text-lg font-semibold">Main Image</h2>
			<p>
				Looking for cool creative common images?
				{/* link to unsplash, pexels, pixabay */}
				<Link className="pl-1 text-pink-500" href="https://unsplash.com/">
					Unsplash /
				</Link>
				<Link className="pl-1 text-pink-500" href="https://www.pexels.com/">
					Pexels /
				</Link>
				<Link className="pl-1 text-pink-500" href="https://pixabay.com/">
					Pixabay
				</Link>
			</p>
			{children}
		</>
	);
};

export default FrontPageTab;
