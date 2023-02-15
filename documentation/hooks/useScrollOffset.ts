import { useEffect, useState } from 'react';

/**
 * Tracks the current scrollTop value for a scrollable area
 *
 * @param el The scrollable area
 * @returns The current scrollTop value for the scrollable area
 */
export function useScrollOffset(el: React.RefObject<HTMLElement>) {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (!el.current) return;
        const scrollableElement = el.current;

        const onScroll = () => setOffset(scrollableElement.scrollTop);

        scrollableElement.removeEventListener('scroll', onScroll);
        scrollableElement.addEventListener('scroll', onScroll, { passive: true });
        return () => scrollableElement.removeEventListener('scroll', onScroll);
    }, [el, offset]);

    return offset;
}
