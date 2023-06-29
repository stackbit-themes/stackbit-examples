import { TestingContext } from '@/contexts/TestableContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

export const TEST_MODE_KEY = 'test_mode';

export default function App({ Component, pageProps }: AppProps) {
    const [testMode, setTestModeState] = useState(false);

    function setTestMode(testMode: boolean) {
        if (testMode) {
            localStorage.setItem(TEST_MODE_KEY, 'true');
            setTestModeState(true);
        } else {
            localStorage.removeItem(TEST_MODE_KEY);
            setTestModeState(false);
        }
    }

    useEffect(() => {
        if (localStorage.getItem(TEST_MODE_KEY) === 'true') setTestModeState(true);
    }, [setTestModeState]);

    useEffect(() => {
        window.addEventListener('stackbitObjectsChanged', () => {
            fetch('/api/cache-content', { method: 'POST' });
        });
    }, []);

    return (
        <TestingContext.Provider value={{ testMode, setTestMode }}>
            <Component {...pageProps} />;
        </TestingContext.Provider>
    );
}
