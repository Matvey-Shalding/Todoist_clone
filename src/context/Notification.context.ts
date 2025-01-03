import { createContext, Dispatch, SetStateAction } from 'react';

export interface NotificationContextType {
	setMessage: Dispatch<SetStateAction<string>>;
	setOnReject: Dispatch<SetStateAction<(() => void) | null>>;
	setOnConfirm: Dispatch<SetStateAction<() => void>>;
}
export const NotificationContext = createContext<NotificationContextType | null>(null);
