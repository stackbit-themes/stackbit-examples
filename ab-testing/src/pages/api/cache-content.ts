import { cacheContentfulContent } from '@/content/contentful';
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

    await cacheContentfulContent();

    res.status(200).json({ message: 'ok' });
}
