import { createContext } from 'react';
import { Grouping } from '../types/Grouping.type';
export type GroupingContextType = [Grouping, React.Dispatch<React.SetStateAction<Grouping>>];
export const GroupingContext = createContext<GroupingContextType | null>(null);
