import { Banner } from '@/components/Banner';
import { Button } from '@/components/Button';
import { Component } from '@/components/component-types';
import { Testable } from '@/components/Testable';
import { Hero as HeroType } from '@/content/content-types';
import { objectIdAnnotation } from '@/utils/annotations';
import { componentPath } from '@/utils/components';

export const Hero: Component<HeroType> = (props) => {
    if (!props.id) return null;

    return (
        <div className="px-8 pt-56 pb-36" {...objectIdAnnotation(props.id)}>
            <div className="flex items-center justify-center max-w-3xl mx-auto text-center">
                <div>
                    {props.banner && (
                        <div className="mb-12">
                            <Banner {...props.banner} {...componentPath('banner', props)} />
                        </div>
                    )}
                    <div className="mb-12">
                        <Testable id={props.id} className="text-6xl font-bold" field="heading" tagName="h1" tests={props.tests}>
                            {props.heading}
                        </Testable>
                    </div>
                    <div className="mb-12">
                        <Testable
                            id={props.id}
                            className="max-w-xl mx-auto text-2xl font-light leading-normal"
                            field="content"
                            tests={props.tests}
                            tagName="div"
                        >
                            <span dangerouslySetInnerHTML={{ __html: props.content }} />
                        </Testable>
                    </div>
                    <div className="inline-flex items-center justify-center space-x-12">
                        {(props.buttons || []).map((button, index) => {
                            return <Button key={index} {...button} {...componentPath(`buttons/${index}`, props)} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
