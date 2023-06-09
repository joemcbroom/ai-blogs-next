import ImgComponent from '#/components/UI/ImgComponent';

export default function NotFound() {
	return (
		<>
			<div className="flex h-screen w-screen flex-col items-center justify-center bg-black text-white">
				<ImgComponent src="/images/404-bg-astronaut.png" alt="404" />
				<h2>Not Found</h2>
				<p>Could not find requested resource</p>
			</div>
		</>
	);
}
