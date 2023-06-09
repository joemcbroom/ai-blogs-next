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

	if (isDark === null) return <IconLoader className="h-3 w-3" />;

	return (
		<Switch
			checked={isDark}
			onChange={toggleTheme}
			className={`${
				isDark ? 'bg-blue-600' : 'bg-gray-200'
			} relative inline-flex h-6 w-11 items-center rounded-full`}
		>
			<span
				className={`${
					isDark ? 'translate-x-0' : 'translate-x-full'
				} inline-block h-4 w-4 transform rounded-full bg-white transition md:h-6 md:w-6`}
			>
				<Image src={isDark ? sunUrl : moonUrl} alt="sun/moon" />
			</span>
		</Switch>
	);
};

export default DarkToggle;
