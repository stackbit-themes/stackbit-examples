const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    plugins: [
        {
            module: require('sourcebit-source-contentful'),
            options: {
                /**
                 * accessToken ( Personal Access Token )
                 *
                 * The accessToken is also referred to as the Personal Access Token and can be generated in Contentful in several places.
                 * 1. It can be found in User Account Settings > Tokens > Personal Access Tokens - https://app.contentful.com/account/profile/cma_tokens
                 * 2. It can be found in Contentful Space Settings > API Keys > Content management tokens tab > Generate personal token - https://app.contentful.com/spaces/<space-id>/api/cma_tokens
                 *
                 * The accessToken can be used instead of the deliveryToken & previewToken. If the other keys are not found it will generate them.
                 * can be used to run `npm run build` and `npm run dev`
                 * must be used to import/export data using `./contentful/import.js` and `./contentful/export.js`
                 **/
                accessToken: process.env['CONTENTFUL_ACCESS_TOKEN'],

                // deliveryToken is found in the Contentful Space Settings > API Keys > Content delivery / preview tokens > Content Delivery API - access token
                // can be used to run `npm run build`
                deliveryToken: process.env['CONTENTFUL_DELIVERY_TOKEN'],

                // previewToken is found in Contentful Space Settings > API Keys > Content delivery / preview tokens > Content Preview API - access token
                // can be used to run `npm run dev`
                previewToken: process.env['CONTENTFUL_PREVIEW_TOKEN'],

                // spaceId is found in Contentful Space Settings > General settings > Space ID
                spaceId: process.env['CONTENTFUL_SPACE_ID'],
                environment: process.env['CONTENTFUL_ENVIRONMENT'] || 'master',
                preview: isDev,
                watch: isDev,
                host: isDev ? 'preview.contentful.com' : undefined
            }
        },

        {
            module: require('sourcebit-target-next'),
            options: {
                flattenAssetUrls: true,
                liveUpdate: isDev,
                pages: function (objects, utils) {
                    return objects.reduce((pages, page) => {
                        if (page.__metadata.modelName === 'Page') {
                            return pages.concat({
                                path: '{slug}',
                                page
                            });
                        }

                        return pages;
                    }, []);
                },
                commonProps: function (objects, utils) {
                    return {
                        site: objects.find((object) => object.__metadata.modelName === 'SiteConfig')
                    };
                }
            }
        }
    ]
};
