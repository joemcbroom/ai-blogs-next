'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Alert, { AlertProps } from './Alert';

interface AlertContextValue {
	showAlert: (options: Omit<AlertProps, 'onClose'>) => void;
}

interface AlertProviderProps {
	children: ReactNode;
}

const AlertContext = createContext<AlertContextValue | null>(null);

export const useAlert = () => {
	const context = useContext(AlertContext);

	if (!context) {
		throw new Error('useAlert must be used within an AlertProvider');
	}

	return context;
};

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
	const [alertOptions, setAlertOptions] = useState<Omit<
		AlertProps,
		'onClose'
	> | null>(null);

	const showAlert = (options: Omit<AlertProps, 'onClose'>) => {
		setAlertOptions(options);
		setTimeout(() => setAlertOptions(null), options.duration || 3000);
	};

	return (
		<AlertContext.Provider value={{ showAlert }}>
			{alertOptions && <Alert {...alertOptions} />}
			{children}
		</AlertContext.Provider>
	);
};
