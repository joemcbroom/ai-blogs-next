const IconWithText = ({
	icon: Icon,
	text,
	onClick,
}: {
	icon: any;
	text: string;
	onClick: () => void;
}) => (
	<span className="flex cursor-pointer items-center gap-1" onClick={onClick}>
		<Icon className="h-5 w-5" />
		<span className="text-pink-500">{text}</span>
	</span>
);

export default IconWithText;
