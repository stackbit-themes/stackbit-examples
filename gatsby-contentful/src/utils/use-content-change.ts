import { useEffect } from 'react';
import { isDev } from './annotations';

// While in the Stackbit editor, listen on content changes and refresh the page
export function useContentChange() {
    useEffect(() => {
        if (!isDev) return;

        const handleContentChange = async (event: Event) => {
            event.preventDefault();
            await fetch('/__refresh', { method: 'POST' });
        };

        window.addEventListener('stackbitObjectsChanged', handleContentChange);

        // cleanup this component
        return () => {
            window.removeEventListener('stackbitObjectsChanged', handleContentChange);
        };
    }, []);
}
