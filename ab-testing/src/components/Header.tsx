import { Page } from '@/content/content-types';
import Link from 'next/link';

export const Header: React.FC<{ pages: Page[] }> = (props) => {
    return (
        <div className="absolute top-0 left-0 z-10 w-screen">
            <div className="flex items-center justify-center px-8 py-8 space-x-8">
                {props.pages.map((page, index) => {
                    return (
                        <Link key={index} href={page.urlPath} className="text-sm font-medium tracking-wider uppercase">
                            {page.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
