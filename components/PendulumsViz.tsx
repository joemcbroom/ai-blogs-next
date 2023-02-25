'use client';

import { useEffect, useState } from 'react';

interface PendulumsVizProps {
	n: number;
	width?: number; // width of the container
	interval?: number;
}

interface PendulumProps {
	length: number;
	index: number;
	rotation?: number;
	interval?: number;
}

/* Pendulum increments back and forth between -45 and 45 degrees */
/* using the pendulum period calculation to determine how many degrees */
const Pendulum: React.FC<PendulumProps> = ({ length, index }) => {
	const [rotation, setRotation] = useState(45);
	const [direction, setDirection] = useState('right');

	const calculatePendulumPeriod = (length) => {
		const period = 2 * Math.PI * Math.sqrt(length / 9.81);
		return period;
	};

	const calculateDegreesPerInterval = (length) => {
		const period = calculatePendulumPeriod(length);
		const degreesPerInterval = 90 / period;
		return degreesPerInterval;
	};

	const calculateNewRotation = (rotation, degreesPerInterval, direction) => {
		let newRotation = rotation;
		if (direction === 'left') {
			newRotation = Math.max(rotation - degreesPerInterval, -45);
		} else {
			newRotation = Math.min(rotation + degreesPerInterval, 45);
		}
		return newRotation;
	};

	const calculateNewDirection = (rotation, direction) => {
		let newDirection = direction;
		if (rotation <= -45 || rotation >= 45) {
			newDirection = direction === 'left' ? 'right' : 'left';
		}
		return newDirection;
	};

	useEffect(() => {
		const degreesPerInterval = calculateDegreesPerInterval(length);
		const interval = setInterval(() => {
			const newRotation = calculateNewRotation(
				rotation,
				degreesPerInterval,
				direction
			);
			const newDirection = calculateNewDirection(newRotation, direction);
			setRotation(newRotation);
			setDirection(newDirection);
		}, 30);
		return () => clearInterval(interval);
	}, [rotation, direction, length]);

	return (
		<div
			className={`absolute flex w-4 origin-top flex-col items-center justify-center transition-transform ease-linear`}
			style={{
				height: `${length}px`,
				transform: `rotate(${rotation}deg)`,
			}}
		>
			<div className="w-1 basis-full bg-black" />
			<div
				className={`h-4 w-4 rounded-full ${
					index % 2 ? 'bg-red-400' : 'bg-teal-400'
				}`}
			/>
		</div>
	);
};

const PendulumsViz: React.FC<PendulumsVizProps> = ({
	n = 10,
	interval = 1000,
}) => {
	const [length] = useState(200);
	return (
		<div className="grid h-screen w-screen place-items-center">
			<div className="relative flex h-[1000px] w-[1500px] justify-center overflow-hidden border">
				{Array.from(new Array(n)).map((_, index) => (
					<Pendulum
						length={length * (1 + index * 0.2)}
						index={index}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};

const calculatePendulumPeriod = (length: number) =>
	2 * Math.PI * Math.sqrt(length / 9.81);

export default PendulumsViz;
