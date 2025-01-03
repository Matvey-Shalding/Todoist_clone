import { createContext, Dispatch, SetStateAction } from 'react';


export type ModalContextType = [boolean, Dispatch<SetStateAction<boolean>>];

export const ModalContext = createContext<null | ModalContextType>(null)