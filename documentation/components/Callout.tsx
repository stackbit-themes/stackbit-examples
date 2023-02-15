import { Callout as CalloutProps } from '@/types';
import { Icon } from './Icon';

export const Callout: React.FC<CalloutProps> = (props) => {
    return (
        <div
            className="flex items-start justify-start p-4 my-8 space-x-3 border rounded-md section bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-600"
            data-sb-object-id={props._id}
        >
            <span className="relative flex-shrink-0 block w-6 text-slate-400">
                <Icon.Info />
            </span>
            <span className="block" dangerouslySetInnerHTML={{ __html: props.body }} data-sb-field-path="body" />
        </div>
    );
};
