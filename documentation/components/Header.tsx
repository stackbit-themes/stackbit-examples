import { Theme } from '@/hooks/useThemeSwitcher';
import { SiteConfig } from '@/types';
import Link from 'next/link';
import { Icon } from './Icon';

type Props = SiteConfig & {
    toggleTheme: Function;
    theme: Theme;
};

export const Header: React.FC<Props> = (props) => {
    const IconTagName = props.theme === 'dark' ? Icon.Sun : Icon.Moon;

    return (
        <div className="border-b border-slate-200 dark:border-slate-600" data-sb-object-id={props._id}>
            <div className="flex items-center justify-between px-6 py-4">
                <Link href="/" className="font-black" data-sb-field-path="title">
                    {props.title}
                </Link>
                <div className="flex items-center space-x-4">
                    <button className="w-5" onClick={() => props.toggleTheme()}>
                        <IconTagName />
                    </button>
                    {props.githubUrl && (
                        <a href={props.githubUrl} className="w-5 mr-5" target="_blank" rel="noreferrer" data-sb-field-path="githubUrl#@href">
                            <Icon.GitHub />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
