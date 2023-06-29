import { MANAGEMENT_TOKEN, SPACE_ID } from '@/utils/constants';
import { createClient } from 'contentful-management';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
    }

    if (process.env.STACKBIT_PREVIEW !== 'true') {
        res.status(403).json({ message: 'Forbidden' });
    }

    const { field, componentId } = JSON.parse(req.body);
    if (!field || !componentId) {
        res.status(400).json({ message: 'Bad Request' });
    }

    // Init Contentful client
    const client = createClient({ accessToken: MANAGEMENT_TOKEN, host: 'api.contentful.com' });
    const space = await client.getSpace(SPACE_ID);
    const env = await space.getEnvironment('master');

    // Create a new entry for the test
    const test = await env.createEntry('test', {
        fields: {
            title: { 'en-US': `New A/B Test for ${componentId}` },
            field: { 'en-US': field },
            values: { 'en-US': ['Option #1', 'Option #2'] }
        }
    });

    // Retrieve the existing component
    const component = await env.getEntry(componentId);
    if (!component) {
        res.status(404).json({ message: 'Component Not Found' });
    }

    // Attach the test to the component
    const tests = (component.fields.tests && component.fields.tests['en-US']) || [];
    tests.push({ sys: { type: 'Link', linkType: 'Entry', id: test.sys.id } });
    component.fields.tests = { 'en-US': tests };
    await component.update();

    res.status(200).json({ message: 'ok' });
}
