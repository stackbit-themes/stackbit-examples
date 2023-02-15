import { PageHeading } from '@/types';
import Link from 'next/link';
import { useEffect } from 'react';

const headingLevelClassMap: {
    [K in PageHeading['level']]: string;
} = {
    '1': '',
    '2': '',
    '3': 'ml-3',
    '4': 'ml-6',
    '5': 'ml-9',
    '6': 'ml-12'
};

type Props = {
    /**
     * The TableOfContents component sets the offset property on each item in
     * the items array.
     */
    items: Array<PageHeading & { offset?: number }>;
    /**
     * The current scrollTop value for the scrollable area, likely coming from
     * the useScrollOffset hook.
     */
    scrollTop: number;
    /**
     * The offset to apply to the heading offset when determining the active
     * item. This is usually set to the padding or margin of the scrollable
     * area.
     */
    scrollOffset?: number;
    /**
     * React ref to the scrollable area. This is used to determine the offset of
     * each heading.
     */
    bodyRef: React.RefObject<HTMLElement>;
};

export const TableOfContents: React.FC<Props> = (props) => {
    useEffect(() => {
        const bodyEl = props.bodyRef.current;
        if (!bodyEl) return;

        for (const item of props.items) {
            const headingEl = document.getElementById(item.href.slice(1));
            if (!headingEl) continue;
            item.offset = headingEl.offsetTop - (props.scrollOffset || 0);
        }
    }, [props.bodyRef, props.items, props.scrollOffset]);

    const activeItemIndex: number = props.items.reduce((acc, item, index) => {
        // If offsets are not set, there won't be an active item
        if (!item.offset) return acc;
        // If we've passed the current heading reference, return this item as a
        // potentially active item
        if (item.offset < props.scrollTop) return index;
        // Otherwise, return the previous item as the active item
        return acc;
    }, -1);

    if ((props.items || []).length === 0) return null;

    return (
        <div>
            <p className="mb-3 text-sm font-semibold tracking-widest uppercase">On This Page</p>
            <ul>
                {props.items.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className={`mb-1 text-sm ${activeItemIndex === index ? 'text-indigo-500 dark:text-indigo-300' : ''} ${
                                headingLevelClassMap[item.level]
                            }`}
                        >
                            <Link href={item.href}>{item.title}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
