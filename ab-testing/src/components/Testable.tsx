import { PencilIcon, PlusIcon } from '@/components/Icon';
import { Test } from '@/content/content-types';
import { TestingContext } from '@/contexts/TestableContext';
import { fieldPathAnnotation, objectIdAnnotation } from '@/utils/annotations';
import { MouseEventHandler, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Portal } from 'react-portal';

type TestableProps = PropsWithChildren & {
    /** ID of the component object */
    id: string;
    field: string;
    tagName?: keyof JSX.IntrinsicElements;
    tests?: Test[];
    className?: string;
};

export const Testable: React.FC<TestableProps> = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [newEntryLoading, setNewEntryLoading] = useState(false);
    const { testMode } = useContext(TestingContext);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setModalOpen(false);
        };
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [modalOpen]);

    const createNewTest: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        setNewEntryLoading(true);
        await fetch('/api/new-test', {
            method: 'POST',
            body: JSON.stringify({ field: props.field, componentId: props.id })
        });
        setNewEntryLoading(false);
    };

    const test = (props.tests || []).find((test) => test.field === props.field);

    if (!props.children) return null;

    if (!testMode) {
        return (
            <TestableWrapper {...props} test={test}>
                {props.children}
            </TestableWrapper>
        );
    }

    return (
        <>
            {newEntryLoading && <LoadingModal />}
            <div className="relative border-2 border-dotted border-amber-600/40" onClick={(e) => e.preventDefault()}>
                {modalOpen && <TestableModal test={test} closeModal={() => setModalOpen(false)} />}
                <div className="absolute bottom-[calc(100%+2px)] bg-amber-600/40 max-w-full text-white text-sm py-2 px-3 right-[-1px] leading-none">
                    {test?.id && (
                        <button className="w-4 h-4 font-bold uppercase shrink-0 font-xs" onClick={() => setModalOpen(true)}>
                            <PencilIcon />
                        </button>
                    )}
                    {!test?.id && (
                        <button className="w-4 h-4 font-bold uppercase shrink-0 font-xs" onClick={createNewTest}>
                            <PlusIcon />
                        </button>
                    )}
                </div>
                <TestableWrapper {...props} test={test}>
                    {props.children}
                </TestableWrapper>
            </div>
        </>
    );
};

/* ----- Value Wrapper ----- */

export const TestableWrapper: React.FC<Omit<TestableProps, 'tests'> & { test?: Test }> = (props) => {
    const TagName = props.tagName || 'span';
    return (
        <TagName className={props.className} {...fieldPathAnnotation(props.field)} data-testable-id={props.test?.id}>
            {props.children}
        </TagName>
    );
};

/* ----- View Modal ----- */

type TestableModalProps = {
    test?: Test;
    closeModal: MouseEventHandler<HTMLButtonElement>;
};

export const TestableModal: React.FC<TestableModalProps> = (props) => {
    if (!props.test) return null;

    return (
        <Portal>
            <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-md">
                <div className="relative w-full max-w-3xl mx-auto text-base text-left bg-white shadow-sm">
                    <div className="mb-12 last:mb-0" {...objectIdAnnotation(props.test.id)}>
                        <div className="flex items-center justify-between px-8 py-5 border-b border-b-slate-200">
                            <h2 className="text-2xl font-medium leading-none" {...fieldPathAnnotation('title')}>
                                {props.test.name}
                            </h2>
                            <button className="text-xl leading-none" onClick={props.closeModal}>
                                X
                            </button>
                        </div>
                        <div className="px-8 py-6">
                            <div className="mb-6">
                                <code className="block mb-1 text-xs font-bold uppercase text-slate-400">ID</code>
                                <code className="block font-medium text-slate-700">{props.test.id}</code>
                            </div>
                            <div className="mb-6">
                                <code className="block mb-1 text-xs font-bold uppercase text-slate-400">Field</code>
                                <code className="block font-medium text-slate-700">{props.test.field}</code>
                            </div>
                            <div {...fieldPathAnnotation('values')}>
                                <code className="block mb-2 text-xs font-bold uppercase text-slate-400">Values</code>
                                {(props.test.values || []).map((value, index) => {
                                    return (
                                        <div key={index} {...fieldPathAnnotation(`.${index}`)} className="mb-4 last:mb-0">
                                            {value ? value : <p className="bg-yellow-200/50">[no content]</p>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

/* ----- Loading Modal ----- */

export const LoadingModal: React.FC = () => {
    return (
        <Portal>
            <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-md">
                <div className="relative w-full max-w-3xl mx-auto text-base text-left bg-white shadow-sm">
                    <div className="p-16 text-2xl font-medium text-center">Creating new test ...</div>
                </div>
            </div>
        </Portal>
    );
};
