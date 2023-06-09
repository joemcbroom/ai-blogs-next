// Alert.tsx
import React, { useState, useEffect } from 'react';

export interface AlertProps {
	message: string;
	duration?: number;
	type?: 'success' | 'error' | 'info';
}

const Alert: React.FC<AlertProps> = ({
	message,
	duration = 3000,
	type = 'info',
}) => {
	const [show, setShow] = useState(false);
	const backgroundClasses = {
		success: 'bg-green-500',
		error: 'bg-red-500',
		info: 'bg-blue-500',
	};

	useEffect(() => {
		setShow(true);
		const timer = setTimeout(() => {
			setShow(false);
		}, duration - 250);

		return () => clearTimeout(timer);
	}, [duration]);

	return (
		<div
			className={`fixed right-4 top-4 rounded-md p-4 shadow-md transition-transform duration-300 ${
				backgroundClasses[type]
			} ${show ? 'translate-x-0' : 'translate-x-full'}`}
		>
			<p className="text-black">{message}</p>
		</div>
	);
};

export default Alert;
