import { Button } from '@/components/Button';
import { Component } from '@/components/component-types';
import { Testable } from '@/components/Testable';
import { Banner as BannerType } from '@/content/content-types';
import { objectIdAnnotation } from '@/utils/annotations';
import { componentPath } from '@/utils/components';

export const Banner: Component<BannerType> = (props) => {
    return (
        <div
            className="inline-flex items-center justify-center px-4 py-2 space-x-4 text-sm leading-none border-2 rounded-full border-slate-400"
            {...objectIdAnnotation(props.id)}
        >
            <Testable className="font-medium" field="content" tests={props.tests} id={props.id}>
                <span dangerouslySetInnerHTML={{ __html: props.content }} />
            </Testable>
            {props.button && <Button {...props.button} {...componentPath('button', props)} />}
        </div>
    );
};
