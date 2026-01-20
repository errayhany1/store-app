import { Api } from 'nocodb-sdk';

const NOCODB_URL = process.env.NOCODB_URL;
const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;

if (!NOCODB_URL || !NOCODB_API_TOKEN) {
    throw new Error('Missing NOCODB_URL or NOCODB_API_TOKEN environment variables');
}

export const noco = new Api({
    baseURL: NOCODB_URL,
    headers: {
        'xc-token': NOCODB_API_TOKEN
    }
});
