import { createContext } from 'react';

interface ContextProps {
    theme: 'dark' | 'light' | null;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
    theme: null,
    toggleTheme: () => {}
});
