'use client';
import { AlertProvider } from '#/lib/hooks/useAlert';
import { SupabaseProvider } from '#/lib/hooks/useSupabase';
import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';

type ProvidersProps = {
	children: React.ReactNode;
};
export default function DarkThemeProvider({ children }: ProvidersProps) {
	return (
		<ThemeProvider attribute="class">
			<SupabaseProvider>
				<AlertProvider>{children}</AlertProvider>
			</SupabaseProvider>
		</ThemeProvider>
	);
}
