import { createContext } from 'react';
import { Task } from '../types/Task.type';

export interface PageContextType {
	sections: string[];
	tasks: Task[];
}

export const PageContext = createContext<null | PageContextType>(null);
