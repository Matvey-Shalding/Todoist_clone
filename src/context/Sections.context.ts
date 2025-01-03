import { createContext } from 'react';
import { Updater } from 'use-immer';

export type SectionContextType = [string[],Updater<string[]>]

export const SectionsContext = createContext<null | SectionContextType>(null)