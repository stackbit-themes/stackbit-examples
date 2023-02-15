import { Heading, Page, PageHeading } from '@/types';

export function getTableOfContents(page: Page): PageHeading[] {
    const headingSections = page.sections?.filter((section) => section._type === 'heading') as Heading[];
    return headingSections.map((heading) => ({
        title: heading.body,
        href: `#${heading._id}`,
        level: heading.level
    }));
}
