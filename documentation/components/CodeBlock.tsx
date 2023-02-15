import { CodeBlock as CodeBlockProps } from '@/types';

export const CodeBlock: React.FC<CodeBlockProps> = (props) => {
    return (
        <div className="my-8 border rounded-md section bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-600" data-sb-object-id={props._id}>
            {props.label && (
                <div className="px-4 py-1 border-b border-slate-200 bg-slate-200 dark:border-slate-600 dark:bg-slate-800">
                    <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-200" data-sb-field-path="label">
                        {props.label}
                    </span>
                </div>
            )}
            <pre className="p-4 overflow-x-scroll" data-sb-field-path="body">
                <code className={`language-${props.code.language} bg-transparent border-none p-0`} dangerouslySetInnerHTML={{ __html: props.code.html }} />
            </pre>
        </div>
    );
};
