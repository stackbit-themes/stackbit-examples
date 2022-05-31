import { render, screen } from '@testing-library/react';
import { FlexiblePage, getStaticProps, getStaticPaths } from '../pages/[[...slug]]';
import sourcebit from 'sourcebit';
import config from '../sourcebit.js';
import { act } from 'react-dom/test-utils';
import { omit, transform, isObject, isArray, keyBy, isNil } from 'lodash';

const sourcebitOptions = {};

function deepOmit(input, props) {
    function omitDeepOnOwnProps(obj) {
        if (typeof input === 'undefined') {
            return input;
        }

        if (!Array.isArray(obj) && !isObject(obj)) {
            return obj;
        }

        if (Array.isArray(obj)) {
            return deepOmit(obj, props);
        }

        const o = {};
        for (const [key, value] of Object.entries(obj)) {
            o[key] = !isNil(value) ? deepOmit(value, props) : value;
        }

        return omit(o, props);
    }

    if (arguments.length > 2) {
        props = Array.prototype.slice.call(arguments).slice(1);
    }

    if (Array.isArray(input)) {
        return input.map(omitDeepOnOwnProps);
    }

    return omitDeepOnOwnProps(input);
}

describe('minimal-contentful-theme', () => {
    // ensure sourcebit has loaded
    beforeEach(async () => {
        console.log('Loading source data...');
        const data = await sourcebit.fetch(config, sourcebitOptions);
        // console.log(data);
    });

    it('getStaticPaths', async () => {
        expect(await getStaticPaths()).toEqual({
            paths: ['/'],
            fallback: false
        });
    });

    it('getStaticProps', async () => {
        const {
            props: { site, page }
        } = await getStaticProps({ params: { slug: '/' } });

        // TODO use `__metadata.modelName` rather than including a special `type` field
        expect(deepOmit(site, '__metadata')).toEqual({
            title: 'Stackbit',
            favicon: 'https://images.ctfassets.net/khn91m4fbfli/5id5VasXXDVtN67zMD2QSN/87a02f7ab69933e39cb768926a62f215/favicon.svg',
            footer: {
                body: 'Made by [Stackbit](https://www.stackbit.com/)\n'
            }
        });

        expect(deepOmit(page, '__metadata')).toEqual({
            slug: '/',
            layout: 'Page',
            title: 'Stackbit Next.js Starter',
            sections: [
                {
                    heading: 'Welcome to Stackbit!',
                    subheading: "You've just [unlocked visual editing capabilities](https://www.stackbit.com/) in this Next.js app.",
                    buttons: [
                        { label: 'Start Building', url: 'https://docs.stackbit.com/getting-started/', theme: 'primary' },
                        { label: 'Read the Docs', url: 'https://docs.stackbit.com/', theme: 'secondary' }
                    ]
                },
                {
                    heading: 'Jump to Topic',
                    subheading: 'Or jump right to a specific topic to help you build your site.',
                    cards: [
                        {
                            heading: 'How Stackbit Works →',
                            subheading: 'Follow an end-to-end guide to learn the inner-workings of Stackbit.',
                            url: 'https://docs.stackbit.com/conceptual-guides/how-stackbit-works/'
                        },
                        {
                            heading: 'Pages →',
                            subheading: 'Add a new type of page to your site, while touching on content modeling and data retrieval.',
                            url: 'https://docs.stackbit.com/how-to-guides/content/'
                        },
                        {
                            heading: 'Components →',
                            subheading: 'Make components editable, add styles, and provide content presets to speed up content editing.',
                            url: 'https://docs.stackbit.com/how-to-guides/components/'
                        },
                        {
                            heading: 'Styling →',
                            subheading: 'Set up global styles and add a styling toolbar to individual components in the visual editor.',
                            url: 'https://docs.stackbit.com/how-to-guides/styles/'
                        }
                    ]
                }
            ]
        });
    });

    it('FlexiblePage', async () => {
        const { props } = await getStaticProps({ params: { slug: '/' } });
        let container: HTMLElement | null = null;
        await act(() => {
            container = render(<FlexiblePage {...props} />).container;
        });
        expect(container).toBeInstanceOf(HTMLElement);
        expect(container).toMatchSnapshot();

        const heading = screen.getByText('Welcome to Stackbit!');
        expect(heading).toBeInTheDocument();
    });
});
