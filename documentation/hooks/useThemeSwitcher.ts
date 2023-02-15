import { useCallback, useEffect, useState } from 'react';

const VALID_THEMES = ['light', 'dark'];

export type Theme = 'light' | 'dark';

export function useThemeSwitcher(): [Theme, (theme: Theme) => void] {
    const [currentTheme, setCurrentTheme] = useState<Theme>('light');

    const toggleTheme = () => {
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    };

    const setTheme = useCallback(
        (theme: Theme) => {
            if (!VALID_THEMES.includes(theme)) {
                throw new Error(`Invalid theme: ${theme}\nMust be one of: ${VALID_THEMES.join(', ')}`);
            }

            if (typeof document !== 'undefined') {
                document.documentElement.classList.remove(currentTheme);
                document.documentElement.classList.add(theme);
            }

            window.localStorage.setItem('theme', theme);
            setCurrentTheme(theme);
        },
        [currentTheme]
    );

    useEffect(() => {
        const theme = window.localStorage.getItem('theme') as Theme;
        if (theme) setTheme(theme);
    }, [setTheme]);

    return [currentTheme, toggleTheme];
}
