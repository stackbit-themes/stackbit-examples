import { buttonThemeClasses } from '@/components/Button';
import { CancelIcon, CheckIcon } from '@/components/Icon';
import { Test } from '@/content/content-types';
import { TestingContext, TestingContextType } from '@/contexts/TestableContext';
import { fieldPathAnnotation, objectIdAnnotation } from '@/utils/annotations';
import classNames from 'classnames';
import contentCache from 'content-cache' assert { type: 'json' };
import { useContext } from 'react';

export function EditorHub() {
    const { testMode, setTestMode } = useContext(TestingContext);
    const allTests = contentCache.tests as Test[];

    return (
        <main className="py-16">
            <div className="max-w-3xl mx-auto">
                <InspectorControl {...{ testMode, setTestMode }} />
                <TestList tests={allTests} />
            </div>
        </main>
    );
}

/* ----- List of Tests ----- */

const TestList: React.FC<{ tests: Test[] }> = (props) => {
    return (
        <Section>
            <SectionHeading>All Tests</SectionHeading>

            {props.tests.map((test) => {
                return <Test {...test} key={test.id} />;
            })}
        </Section>
    );
};

const Test: React.FC<Test> = (props) => {
    return (
        <div className="p-6 mb-8 border rounded-sm border-slate-300" {...objectIdAnnotation(props.id)}>
            <div className="mb-4 text-lg font-medium text-slate-900">{props.name}</div>

            <div className="mb-6">
                <code className="block mb-1 text-xs font-bold uppercase text-slate-400">ID</code>
                <code className="block font-medium text-slate-700">{props.id}</code>
            </div>
            {props.component && (
                <div {...objectIdAnnotation(props.component.id)}>
                    <div className="mb-6">
                        <code className="block mb-1 text-xs font-bold uppercase text-slate-400">Component Type</code>
                        <code className="block font-medium text-slate-700">{props.component.type}</code>
                    </div>
                    <div className="mb-6">
                        <code className="block mb-1 text-xs font-bold uppercase text-slate-400">Component ID</code>
                        <code className="block font-medium text-slate-700">{props.component.id}</code>
                    </div>
                </div>
            )}
            <div className="mb-6">
                <code className="block mb-1 text-xs font-bold uppercase text-slate-400">Field</code>
                <code className="block font-medium text-slate-700" {...fieldPathAnnotation('field')}>
                    {props.field}
                </code>
            </div>
            <div className="mb-6" {...fieldPathAnnotation('values')}>
                <code className="block mb-2 text-xs font-bold uppercase text-slate-400">Values</code>
                {(props.values || []).map((value, index) => {
                    return (
                        <div key={index} {...fieldPathAnnotation(`.${index}`)} className="mb-4 last:mb-0">
                            {value ? value : <p className="bg-yellow-200/50">[no content]</p>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* ----- Test Inspector ----- */

const InspectorControl: React.FC<TestingContextType> = (props) => {
    return (
        <Section>
            <SectionHeading>A/B Test Inspector</SectionHeading>
            <div
                className={classNames('flex', 'items-center', 'mb-4', 'space-x-2', 'font-medium', {
                    'text-emerald-600': props.testMode,
                    'text-slate-600': !props.testMode
                })}
            >
                {props.testMode ? (
                    <>
                        <span className="w-4 h-4">
                            <CheckIcon />
                        </span>
                        <span>Inspector is enabled</span>
                    </>
                ) : (
                    <>
                        <span className="w-4 h-4">
                            <CancelIcon />
                        </span>
                        <span>Inspector is disabled</span>
                    </>
                )}
            </div>
            <button className={classNames(buttonThemeClasses('default'), 'text-xs')} onClick={() => props.setTestMode(props.testMode ? false : true)}>
                {props.testMode ? 'Disable' : 'Enable'} Inspector
            </button>
        </Section>
    );
};

/* ----- Component Helpers ----- */

const SectionHeading: React.FC<React.PropsWithChildren> = (props) => {
    return <h2 className="mb-6 text-lg font-medium tracking-widest uppercase text-slate-900">{props.children}</h2>;
};

const Section: React.FC<React.PropsWithChildren> = (props) => {
    return <div className="mb-16 last:mb-0">{props.children}</div>;
};
