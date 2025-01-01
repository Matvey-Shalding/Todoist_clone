import { createContext, Dispatch, SetStateAction } from 'react';

export type ReRenderContextType = [string, Dispatch<SetStateAction<string>>]

export const ReRenderContext = createContext<null | ReRenderContextType>(null);
