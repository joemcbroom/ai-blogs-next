'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@headlessui/react';
import IconLoader from '../loaders/IconLoader';
import sunUrl from './sun.svg';
import moonUrl from './moon.svg';
import Image from 'next/image';

const DarkToggle = () => {
	const { theme, setTheme } = useTheme();
	const [isDark, setIsDark] = useState<boolean | null>(null);

	const toggleTheme = () => {
		setIsDark((prev) => !prev);
		setTheme(isDark ? 'light' : 'dark');
	};

	useEffect(() => {
		setIsDark(
			theme === 'dark' ||
				(theme === 'system' &&
					window.matchMedia('(prefers-color-scheme: dark)').matches)
		);
	}, [theme]);

	const loader = ({ src }: { src: string }) => {
		return `${src}`;
	};

	return (
		<Switch
			checked={isDark ?? false}
			onChange={toggleTheme}
			className={`${
				isDark ? 'bg-sky-600' : 'bg-gray-200'
			} relative inline-flex h-6 w-11 items-center rounded-full`}
		>
			<span
				className={`${
					isDark ? 'translate-x-0' : 'translate-x-full'
				} grid h-6 w-6 transform place-items-center overflow-hidden rounded-full bg-white transition`}
			>
				{isDark === null ? (
					<IconLoader className="h-3 w-3" />
				) : (
					<Image
						loader={loader}
						src={isDark ? sunUrl : moonUrl}
						alt="sun/moon"
					/>
				)}
			</span>
		</Switch>
	);
};

export default DarkToggle;
